import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import EventCard from '../components/Vinuk/EventCard';
import * as Location from 'expo-location';
import Header from '@/components/Vinuk/Header';
import SearchBar from '@/components/Vinuk/SearchBar';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const API_KEY = 'AIzaSyB-lnBLwMFZ30uDuWSgCdDYn63pa1wvWww';

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
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [directionsCoordinates, setDirectionsCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [showDirections, setShowDirections] = useState(false);
  const [selectedEventLocation, setSelectedEventLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventList: Event[] = [];

        querySnapshot.forEach(doc => {
          const data = doc.data();

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
              id: doc.id,
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
              location: {
                latitude: data.location.latitude,
                longitude: data.location.longitude,
              },
              date: data.date,
              time: data.time,
            };

            eventList.push(event);
          }
        });

        setEvents(eventList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventCardPress = async (eventLocation: { latitude: number; longitude: number }) => {
    if (!location) return;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${location.latitude},${location.longitude}&destination=${eventLocation.latitude},${eventLocation.longitude}&key=${API_KEY}`
      );

      const points = response.data.routes[0].overview_polyline.points;
      const decodePolyline = (points: string) => {
        const coordinates: { latitude: number; longitude: number }[] = [];
        let index = 0, len = points.length;
        let lat = 0, lng = 0;

        while (index < len) {
          let b, shift = 0, result = 0;
          do {
            b = points.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
          const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
          lat += dlat;

          shift = 0;
          result = 0;
          do {
            b = points.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
          const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
          lng += dlng;

          coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }
        return coordinates;
      };

      const routeCoordinates = decodePolyline(points);
      setDirectionsCoordinates(routeCoordinates);
      setSelectedEventLocation(eventLocation); // Set the destination event location
      setShowDirections(true);
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  const handleBackPress = () => {
    setDirectionsCoordinates([]);
    setSelectedEventLocation(null); // Clear selected event location
    setShowDirections(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading your location...</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 7.8731,
          longitude: location ? location.longitude : 80.7718,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {showDirections && (
          <>
            <Polyline coordinates={directionsCoordinates} strokeWidth={4} strokeColor="blue" />
            {selectedEventLocation && (
              <Marker
                coordinate={selectedEventLocation}
                title="Destination"
                description="You are heading here"
              />
            )}
          </>
        )}

        {!showDirections && events.map(event => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.location.latitude,
              longitude: event.location.longitude,
            }}
            title={event.title}
            description={event.description}
          />
        ))}
      </MapView>

      {showDirections && (
        <TouchableOpacity style={styles.backButtonContainer} onPress={handleBackPress}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      )}

      {!showDirections && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.EventListContainer}>
          {events.map(event => (
            <EventCard key={event.id} event={event} onPress={() => handleEventCardPress(event.location)} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

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
  backButtonContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    padding: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
});

export default MapScreen;
