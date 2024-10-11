import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Title */}
      <Text style={styles.headerText}>Aquavista</Text>

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events"
          placeholderTextColor="#999"
        />
        <FontAwesome name="filter" size={24} color="#adacac" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 10, // Spacing for status bar
    zIndex: 10,
    alignItems: 'center', // Center elements horizontally
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#293645', // Set title color to blue
    marginBottom: 10, // Space between title and search bar
  },
  circle: {
    position: 'absolute',
    right: 20, // Position the circle on the right-hand side
    top: 10, // Align it at the top near the title
    width: 45,
    height: 45,
    borderRadius: 45 / 2, // Make it circular
    backgroundColor: '#0384fc', // Blue color for the circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%', // Fill the width of the screen
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

export default Header;
