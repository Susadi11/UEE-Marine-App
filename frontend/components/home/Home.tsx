import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Advertisement from './Advertisement';

// Define the navigation stack params
type RootStackParamList = {
  Home: undefined;
  ExploreEvents: undefined;
  Settings: undefined;
  MapScreen: undefined;
  TrendingPage: undefined;
  BlogDetail: { blogData: Blog };
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
          <TouchableOpacity>
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

      {/* Explore Events with Find Icon */}
      <View style={styles.exploreHeader}>
        <Text style={styles.sectionTitle}>Explore events</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
          <AntDesign name="find" size={28} color="black" style={styles.findIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={true} style={styles.eventsContainer} showsHorizontalScrollIndicator={false}>
        {events.slice(-4).map((event) => (
          <Animated.View
            key={event.id}
            style={[styles.eventCard, { transform: [{ scale: scaleValue }] }]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Image
                source={{ uri: event.imageUrl || 'https://via.placeholder.com/150' }}
                style={styles.eventImage}
              />
              <Text style={styles.eventText}>{event.title}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Explore More Card */}
        <TouchableOpacity
          style={[styles.eventCard, styles.exploreMoreCard]}
          onPress={() => navigation.navigate('ExploreEvents')}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-forward-circle-outline" size={40} color="#6C9EE5" />
          <Text style={styles.exploreMoreText}>Explore More</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Discover Ocean Sounds */}
      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="musical-note-outline" size={24} color="#6C9EE5" />
          <Text style={styles.buttonText}>Discover ocean sounds</Text>
        </View>
      </TouchableOpacity>

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10, // Add space between the icon and the title
    color: '#333',
    opacity: 0.9,
    fontFamily: 'Inter_600SemiBold',
  },
  eventsContainer: {
    paddingLeft: 20,
    marginBottom: 25,
    marginTop: 20,
  },
  eventCard: {
    width: 200,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  eventText: {
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#d1e7ff',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  exploreMoreCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
  },
  exploreMoreText: {
    color: '#6C9EE5',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  actionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 15,
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter_600SemiBold',
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  findIcon: {
    marginRight: 10,
    padding: 10,
  },
  popularDoctorsSection: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllText: {
    color: '#6C9EE5',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter_500Medium',
  },
  trendingBlogsSection: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
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
    fontFamily: 'Inter_600SemiBold',
  },
  noTrendingBlogsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  trendingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
  adv:{
    padding: 20,
  }
});

export default Home; 