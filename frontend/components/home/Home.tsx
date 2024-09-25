import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';

// Define the navigation stack params
type RootStackParamList = {
  Home: undefined;
  ExploreEvents: undefined;
  MapScreen: undefined; // Add your MapScreen here
  // Add other screens as needed
};

// Define the navigation prop for the Home screen
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Define the Event type
type Event = {
  id: string;
  title: string;
  imageUrl?: string;
  // Add other event properties as needed
};

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [scaleValue] = useState(new Animated.Value(1)); // For scaling animation
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventsList);
    };

    fetchEvents();
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

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Message */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to AquaVista!</Text>
        <Ionicons name="settings-outline" size={28} color="#333" />
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

      {/* Check Out Trending Blogs */}
      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.buttonContent}>
          <MaterialCommunityIcons name="fire" size={30} color="#FD7600" />
          <Text style={styles.buttonText}>Check Out the Latest Trending Blogs</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    opacity: 0.9,
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#333',
    opacity: 0.9,
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
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  findIcon: {
    marginRight: 10,
    padding: 10, // Optional: Add padding for a better touch area
  },
});

export default Home;
