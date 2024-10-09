import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or any other icon library

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Handle the search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#aaa" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    position: 'relative',
    width:'90%',
    marginLeft:20,
    
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: '#6C9EE5',
    padding: 10,
    borderRadius: 25,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
