import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Animated } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Advertisement from './Advertisement';
import OceanSoundsCard from './OceanSoundsCard';

// Define the navigation stack params
type RootStackParamList = {
  Home: undefined;
  ExploreEvents: undefined;
  Settings: undefined;
  Profile: undefined;
  MapScreen: undefined;
  TrendingPage: undefined;
  BlogDetail: { blogData: Blog };
  SeaWaveTrack: undefined;
};

// Define the navigation prop for the Home screen
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Define the Event type
type Event = {
  id: string;
  title: string;
  imageUrl?: string;
};

// Define the Blog type
type Blog = {
  id: string;
  coverPhoto: string;
  title: string;
  introduction: string;
  trendingScore: number;
  blog_author?: string;
  blog_sciname?: string;
  blog_physicalCharacteristics?: string;
  blog_category?: string;
  blog_images?: string[];
  blog_habitatDistribution?: string;
  blog_behavior?: string;
  blog_importanceEcosystem?: string;
};

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [trendingBlog, setTrendingBlog] = useState<Blog | null>(null);
  const [scaleValue] = useState(new Animated.Value(1));
  const [fireScale] = useState(new Animated.Value(1));
  const navigation = useNavigation<HomeScreenNavigationProp>();
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventsList);
    };

    const fetchTrendingBlog = async () => {
      try {
        const blogsCollection = collection(db, 'blogs');
        const trendingBlogQuery = query(blogsCollection, orderBy('trendingScore', 'desc'), limit(1));
        const trendingBlogSnapshot = await getDocs(trendingBlogQuery);
        
        if (!trendingBlogSnapshot.empty) {
          const blogDoc = trendingBlogSnapshot.docs[0];
          const blogData = blogDoc.data();
          setTrendingBlog({
            id: blogDoc.id,
            coverPhoto: blogData.blog_coverPhoto || 'https://example.com/default-cover.jpg',
            title: blogData.blog_title || 'Untitled',
            introduction: blogData.blog_behavior || 'No introduction available',
            trendingScore: blogData.trendingScore || 0,
            blog_author: blogData.blog_author,
            blog_sciname: blogData.blog_sciname,
            blog_physicalCharacteristics: blogData.blog_physicalCharacteristics,
            blog_category: blogData.blog_category,
            blog_images: blogData.blog_images,
            blog_habitatDistribution: blogData.blog_habitatDistribution,
            blog_behavior: blogData.blog_behavior,
            blog_importanceEcosystem: blogData.blog_importanceEcosystem,
          });
        } else {
          console.log('No trending blogs found');
          setTrendingBlog(null);
        }
      } catch (error) {
        console.error('Error fetching trending blog:', error);
        setTrendingBlog(null);
      }
    };
    
    fetchEvents();
    fetchTrendingBlog();

    // Fire icon animation (scale pulse effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(fireScale, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fireScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      tension: 200,
      useNativeDriver: true,
    }).start();
  };

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Message */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Hi</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.adv}>
        <Advertisement />
      </View>

      {/* Updated Explore Events Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore Events</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('ExploreEvents')}>
            <Text style={styles.viewAllText}>See More →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.eventsContainer}>
        {events.slice(-4).map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => {/* Navigate to event details */}}
          >
            <Image
              source={{ uri: event.imageUrl || 'https://via.placeholder.com/150' }}
              style={styles.eventImage}
            />
            <View style={styles.eventOverlay}>
              <Text style={styles.eventText}>{event.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Navigations and Discover Ocean Sounds */}
      <View style={styles.cardContainer}>
        {/* Navigations Card */}
        <TouchableOpacity
          style={[styles.actionButton, styles.navigationCard]}
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate('MapScreen')}
        >
          <View style={styles.cardContent}>
            <AntDesign name="find" size={24} color="#333" />
            <Text style={styles.cardTitle}>Navigations</Text>
          </View>
        </TouchableOpacity>

        {/* Discover Ocean Sounds Card */}
        <TouchableOpacity
          style={[styles.actionButton, styles.navigationCard]}
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => navigation.navigate('SeaWaveTrack')}
        >
          <View style={styles.cardContent}>
            <AntDesign name="find" size={24} color="#333" />
            <Text style={styles.cardTitle}>Ocean Sounds</Text>
          </View>
        </TouchableOpacity>
        
      </View>

      {/* Trending Blogs Section */}
      <View style={styles.trendingBlogsSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.trendingTitleContainer}>
            {/* Animated Fire Icon */}
            <Animated.View style={{ transform: [{ scale: fireScale }] }}>
              <MaterialCommunityIcons name="fire" size={24} color="#FF4500" />
            </Animated.View>
            <Text style={styles.sectionTitle}>Trending Blogs</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('TrendingPage')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {trendingBlog ? (
          <TouchableOpacity
            style={styles.trendingCard}
            onPress={() => navigation.navigate('BlogDetail', { blogData: trendingBlog })}
          >
            <Image
              source={{ uri: trendingBlog.coverPhoto }}
              style={styles.trendingImage}
            />
            <View style={styles.trendingInfo}>
              <Text style={styles.trendingName} numberOfLines={2}>{trendingBlog.title}</Text>
              <Text style={styles.trendingIntro} numberOfLines={3}>{trendingBlog.introduction}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ) : (
          <Text style={styles.noTrendingBlogsText}>No trending blogs available at the moment.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    opacity: 0.9,
    fontFamily: 'Inter_700Bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 1,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    opacity: 0.9,
    fontFamily: 'Inter_600SemiBold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  findIconContainer: {
    marginRight: 10,
  },
  viewAllText: {
    color: '#6C9EE5',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  eventsContainer: {
    paddingLeft: 20,
    marginBottom: 25,
  },
  eventCard: {
    width: 200,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
    marginTop: 20,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  eventOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  eventText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationCard: {
    flex: 1,
    marginRight: 10,
  },
  oceanSoundsCard: {
    flex: 1,
    marginLeft: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  trendingBlogsSection: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  trendingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trendingImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Inter_600SemiBold',
  },
  trendingIntro: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter_500Medium',
  },
  noTrendingBlogsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  adv: {
    padding: 20,
  },
});

export default Home;