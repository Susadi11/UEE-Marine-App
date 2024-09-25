import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Map_cmp from '@/components/Vinuk/Map_cmp';
import MapView from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, Image, ScrollView,  Animated } from 'react-native';

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{ //specify our coordinates.
          latitude: 7.8731, 
          longitude: 80.7718, 
          latitudeDelta: 2.5, 
          longitudeDelta: 2.5, 
        }}
      />

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',  
    top: 3,               
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
});

export default Map;