import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { getAudioUrl } from '../firebaseConfig'; // Import the function to get audio URL
import { Ionicons } from '@expo/vector-icons'; // For heart icon

const MusicPlayer1 = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [timer, setTimer] = useState<number | null>(null); // Timer in minutes
  const [timerRunning, setTimerRunning] = useState(false); // Is the timer active?
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null); // Time remaining in milliseconds
  const [isFavorited, setIsFavorited] = useState(false); // State for heart button

  // Path to the audio file in Firebase Storage
  const filePath = 'audios/pray-for-ukraine-sleep-21715.mp3';

  const handlePlayPause = async () => {
    if (isPlaying) {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } else {
      try {
        const url = await getAudioUrl(filePath);

        if (sound) {
          await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: url },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setDuration(status.durationMillis || 0);
            setPosition(status.positionMillis || 0);

            if (status.didJustFinish && timerRunning) {
              // Restart the music if within the timer duration
              newSound.playFromPositionAsync(0);
            }

            if (status.didJustFinish && !timerRunning) {
              setIsPlaying(false); // Stop when no timer is active
            }
          }
        });
      } catch (error) {
        console.error('Error playing audio:', error);
        Alert.alert('Error', 'Unable to play the audio');
      }
    }
  };

  const handleSetTimer = (minutes: number) => {
    setTimer(minutes);
    const totalTime = minutes * 60 * 1000; // Convert minutes to milliseconds
    setTimeRemaining(totalTime);
    setTimerRunning(true);

    // Set interval to check time remaining
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime && prevTime > 0) {
          return prevTime - 1000;
        } else {
          clearInterval(interval);
          setTimerRunning(false);
          if (sound) {
            sound.stopAsync();
          }
          return null;
        }
      });
    }, 1000);
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited); // Toggle the heart icon state
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/031/725/107/non_2x/dive-into-the-colorful-world-of-aquaticgraphy-by-a-renowned-wildlifegrapher-ai-generative-free-photo.jpg' }}
          style={styles.albumCover}
        />
        <Text style={styles.title}>Relaxing Music with Ocean Waves</Text>
      </View>

      {/* Heart Icon for Favorite */}
      <TouchableOpacity onPress={handleFavoriteToggle} style={styles.heartButton}>
        <Ionicons
          name={isFavorited ? 'heart' : 'heart-outline'}
          size={32}
          color={isFavorited ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert(
            'Set Timer',
            'Choose a time period',
            [
              { text: '10 minutes', onPress: () => handleSetTimer(10) },
              { text: '20 minutes', onPress: () => handleSetTimer(20) },
              { text: '30 minutes', onPress: () => handleSetTimer(30) },
              { text: 'Close', style: 'cancel' }, // Close button for the popup
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={styles.buttonText}>Set Timer</Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <View style={styles.iconBackground}>
            <Text style={styles.icon}>{'<'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.playButton]}
          onPress={handlePlayPause}
        >
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
        <View
          style={[styles.progressBar, { width: `${(position / duration) * 100}%` }]}
        />
      </View>

      <View style={styles.timeInfo}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {timerRunning && (
        <View style={styles.timerInfo}>
          <Text style={styles.timeText}>Time remaining: {formatTime(timeRemaining || 0)}</Text>
        </View>
      )}
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
    height: 300,
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
    backgroundColor: '#2196F3',
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
  heartButton: {
    marginBottom: 20,
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
  timerInfo: {
    marginTop: 20,
  },
});

export default MusicPlayer1;
