import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { getAudioUrl } from '../firebaseConfig'; // Import the function to get audio URL
import { Ionicons } from '@expo/vector-icons'; // For heart icon

const MusicPlayer1 = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  // Path to the audio file in Firebase Storage
  const filePath = 'audios/depth-152401.mp3';

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
              newSound.playFromPositionAsync(0);
            }
            if (status.didJustFinish && !timerRunning) {
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

  const handleSetTimer = (minutes: number) => {
    setTimer(minutes);
    const totalTime = minutes * 60 * 1000;
    setTimeRemaining(totalTime);
    setTimerRunning(true);

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
    setIsFavorited(!isFavorited);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/031/725/107/non_2x/dive-into-the-colorful-world-of-aquaticgraphy-by-a-renowned-wildlifegrapher-ai-generative-free-photo.jpg' }}
        style={styles.albumCover}
      />
      <Text style={styles.title}>Relaxing Music with Ocean Waves</Text>

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
              { text: 'Close', style: 'cancel' },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={styles.buttonText}>Set Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
        <Ionicons
          name={isFavorited ? 'heart' : 'heart-outline'}
          size={30}
          color={isFavorited ? '#FF6F61' : '#000'}
        />
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="play-back-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.playButton]}
          onPress={handlePlayPause}
        >
          <Ionicons name={isPlaying ? 'pause-outline' : 'play-outline'} size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="play-forward-outline" size={30} color="#000" />
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
          <Text style={styles.timerText}>Time remaining: {formatTime(timeRemaining || 0)}</Text>
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
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  albumCover: {
    width: '90%',
    height: 350,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderColor: '#BDBDBD',
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#BDBDBD',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 5,
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  favoriteButton: {
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 10,
  },
  playButton: {
    backgroundColor: '#333',
  },
  progressBarBackground: {
    backgroundColor: '#BDBDBD',
    height: 6,
    borderRadius: 3,
    width: '90%',
    marginTop: 20,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: '#4A90E2',
    height: '100%',
    borderRadius: 3,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 8,
  },
  timeText: {
    color: '#333',
    fontWeight: '500',
  },
  timerInfo: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  timerText: {
    color: '#FF6F61',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MusicPlayer1;
