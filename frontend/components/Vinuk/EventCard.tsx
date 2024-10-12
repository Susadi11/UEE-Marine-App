import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

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

interface EventCardProps {
  event: Event;
  onPress: () => void; // Add onPress as a required prop
}

export default function EventCard({ event, onPress }: EventCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Event Image */}
      <Image source={{ uri: event.imageUrl }} style={styles.image} resizeMode="cover" />
      
      {/* Event Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Styles for the Event Card
const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
  description: {
    fontSize: 10,
    color: '#999',
  },
});
