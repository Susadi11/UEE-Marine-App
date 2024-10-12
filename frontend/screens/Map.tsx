import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration
import EventCard from '../components/Vinuk/EventCard';
import * as Location from 'expo-location'; // Correct the Location import
import Header from '@/components/Vinuk/Header';
import SearchBar from '@/components/Vinuk/SearchBar';

// Define Event interface here or import it from another file
interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: {
    latitude: number;
    longitude: number;
  };
  date: string;
  time: string;
}

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null); // Corrected the location state type
  const [loading, setLoading] = useState(true); // For location loading state
  const [events, setEvents] = useState<Event[]>([]); // To store events fetched from Firestore with the correct type

  // Fetch location when component mounts
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      setLoading(false);
    })();
  }, []);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventList: Event[] = []; // Specify the type of eventList as Event[]
        
        querySnapshot.forEach(doc => {
          const data = doc.data();
  
          // Ensure that the data contains all the required fields for an Event
          if (
            data.title && 
            data.description && 
            data.imageUrl && 
            data.location?.latitude && 
            data.location?.longitude && 
            data.date && 
            data.time
          ) {
            const event: Event = {
              id: doc.id, // Set the document id
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
              location: {
                latitude: data.location.latitude,
                longitude: data.location.longitude
              },
              date: data.date,
              time: data.time
            };
  
            eventList.push(event); // Push the event into the eventList
          }
        });
        
        setEvents(eventList); // Set the events state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents();
  }, []);
  
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Header/>

      <View>
        <SearchBar/>
      </View>
      {/* Map Component */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 7.8731,
          longitude: location ? location.longitude : 80.7718,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      />
      {/* Event Card List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.EventListContainer}>
        {events.map(event => (
          <EventCard key={event.id} event={event} /> // Pass each event to EventCard component
        ))}
      </ScrollView>
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EventListContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
  },
});

export default MapScreen;
