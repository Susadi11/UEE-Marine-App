import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer from '@/components/Vindi/TrackPlayer';
import { useNavigation } from '@react-navigation/native';


const MusicPlayer = () => {
  const navigation = useNavigation();



  return (
    <View style={styles.container}>
    
      <TrackPlayer
        title="Relaxing Music with Ocean Wawes "
        albumCover="https://media.istockphoto.com/id/596056886/photo/big-blue-right-vert.jpg?s=612x612&w=0&k=20&c=GYb-poaMWyLXE_DW0zwIByCi63avR05hk7sYUbEfBdE="
        navigateTo='SoundPage'
      />
      
      <TouchableOpacity style={styles.button} onPress={() => { /* Handle button press */ }}>
        <Text style={styles.buttonText}>Set Timer</Text>
      </TouchableOpacity>
      
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <View style={styles.iconBackground}>
            <Text style={styles.icon}>{'<'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.playButton]}>
          <View style={styles.iconBackground}>
            <Text style={styles.icon}>||</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <View style={styles.iconBackground}>
            <Text style={styles.icon}>{'>'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBar} />
      </View>
      
      <View style={styles.timeInfo}>
        <Text style={styles.timeText}>1:57</Text>
        <Text style={styles.timeText}>3:53</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 16,
    
    
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 16,
    zIndex: 1,
    
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  playButton: {
    padding: 16,
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
    backgroundColor: '#e5e7eb',
    height: 4,
    borderRadius: 2,
    width: '100%',
    marginTop: 40,
    
  },
  progressBar: {
    backgroundColor: '#4fd1c5',
    height: 4,
    borderRadius: 2,
    width: '50%',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
    marginBottom:80
  },
  timeText: {
    color: '#4b5563',
    fontSize: 12,
  },
});

export default MusicPlayer;
