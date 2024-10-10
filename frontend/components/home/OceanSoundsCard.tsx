import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the Track type
interface Track {
  id: string;
  title: string;
}

// Define the component props
interface OceanSoundsCardProps {
  onPress: () => void;
  tracks: Track[];
}

const OceanSoundsCard: React.FC<OceanSoundsCardProps> = ({ onPress, tracks }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: 'https://example.com/ocean-background.jpg' }}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Discover Ocean Sounds</Text>
          <Text style={styles.subtitle}>Immerse yourself in the waves</Text>
          <View style={styles.trackPreview}>
            {tracks.slice(0, 3).map((track) => (
              <Text key={track.id} style={styles.trackName}>{track.title}</Text>
            ))}
            {tracks.length > 3 && (
              <Text style={styles.moreText}>+{tracks.length - 3} more</Text>
            )}
          </View>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="#ffffff" />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 5,
  },
  trackPreview: {
    marginTop: 10,
  },
  trackName: {
    color: '#ffffff',
    fontSize: 14,
  },
  moreText: {
    color: '#ffffff',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  playButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    padding: 10,
  },
});

export default OceanSoundsCard;