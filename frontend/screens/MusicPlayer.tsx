import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { getAudioUrl } from '../firebaseConfig'; // Make sure to import the function to get audio URL

const MusicPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  // Path to the audio file in Firebase Storage
  const filePath = 'audios/pray-for-ukraine-sleep-21715.mp3';

  const handlePlayPause = async () => {
    if (isPlaying) {
      // Pause the audio
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } else {
      try {
        const url = await getAudioUrl(filePath); // Get the URL from Firebase

        // Unload previous sound if exists
        if (sound) {
          await sound.unloadAsync();
        }

        // Load and play new sound
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);

        // Set up onPlaybackStatusUpdate to listen for playback updates
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setDuration(status.durationMillis || 0);
            setPosition(status.positionMillis || 0);

            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          }
        });
      } catch (error) {
        console.error('Error playing audio:', error);
        Alert.alert('Error', 'Unable to play the audio');
      }
    }
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: 'https://media.istockphoto.com/id/596056886/photo/big-blue-right-vert.jpg?s=612x612&w=0&k=20&c=GYb-poaMWyLXE_DW0zwIByCi63avR05hk7sYUbEfBdE=' }}
          style={styles.albumCover}
        />
        <Text style={styles.title}>Relaxing Music with Ocean Waves</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => { /* Handle button press */ }}>
        <Text style={styles.buttonText}>Set Timer</Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <View style={styles.iconBackground}>
            <Text style={styles.icon}>{'<'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.playButton]} onPress={handlePlayPause}>
          <View style={styles.iconBackground}>
            <Text style={styles.icon}>{isPlaying ? '||' : '▶'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <View style={styles.iconBackground}>
            <Text style={styles.icon}>{'>'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBar, { width: `${(position / duration) * 100}%` }]} />
      </View>

      <View style={styles.timeInfo}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9fb',
    padding: 16,
  },
  albumCover: {
    width: 350,
    height: 380,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#3D6DCC',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  controlButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  playButton: {
    padding: 16,
    backgroundColor: '#4fd1c5',
  },
  iconBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#4b5563',
    fontSize: 24,
  },
  progressBarBackground: {
    backgroundColor: '#e0e0e0',
    height: 4,
    borderRadius: 2,
    width: '90%',
    marginTop: 30,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: '#3D6DCC',
    height: 4,
    borderRadius: 2,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 8,
  },
  timeText: {
    color: '#4b5563',
    fontSize: 14,
  },
});

export default MusicPlayer;
