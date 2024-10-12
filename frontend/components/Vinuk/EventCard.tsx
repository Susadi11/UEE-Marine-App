import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <View style={styles.card}>
      {/* Event Image */}
      <Image source={{ uri: event.imageUrl }} style={styles.image} resizeMode="cover" />
      
      {/* Event Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.title}</Text>
        {/* <Text style={styles.address}>
          {event.location.latitude}, {event.location.longitude}
        </Text> */}
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </View>
  );
}

// Styles for the Event Card
const styles = StyleSheet.create({
  card: {
    width: 280, // Reduce the card width slightly
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 8, // Reduced border radius for softer corners
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 2, // Equal spacing between cards horizontally
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
    color: '#000',
  },
  address: {
    fontSize: 12,
    color: '#555',
    marginVertical: 4,
  },
  description: {
    fontSize: 10,
    color: '#999',
  },
});
