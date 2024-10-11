import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search Ocean Events"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: 'YOUR_API_KEY', // Replace this with your actual Google API key
          language: 'en',
        }}
        currentLocation={true}
        currentLocationLabel="Current location"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 50,  // Adjust as needed
    left: 20,
    right: 20,
    zIndex: 1, // Ensure it appears above the map
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
