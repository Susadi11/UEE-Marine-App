import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Header from '../components/Vinuk/Header'; // Import the header component
import SearchBar from '@/components/Vinuk/SearchBar';

const MapScreen = () => {
  // Specify the type of location, which will hold coordinates
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Make errorMsg a string or null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords); // Only set the coordinates
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header />
      <SearchBar />

      {/* Map */}
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
});

export default MapScreen;
