import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const EventPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([
    // Sample event data
    { id: '1', title: 'Beach Cleanup', type: 'Community', description: 'Join us for a beach cleanup' },
    { id: '2', title: 'Marine Biology Workshop', type: 'Workshop', description: 'Learn about marine biology' },
    { id: '3', title: 'Ocean Awareness Day', type: 'Awareness', description: 'Raise awareness for ocean protection' },
  ]);

  const filteredEvents = events.filter(event => {
    if (selectedFilter === 'My Events') {
      // Add logic to filter by user's events if needed
      return event.type === 'Workshop'; // Example filter
    }
    return event.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'All Events' && styles.activeFilter]}
          onPress={() => setSelectedFilter('All Events')}
        >
          <Text style={styles.filterText}>All Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'My Events' && styles.activeFilter]}
          onPress={() => setSelectedFilter('My Events')}
        >
          <Text style={styles.filterText}>My Events</Text>
        </TouchableOpacity>
      </View>

      {/* Event List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
  },
  eventCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default EventPage;
