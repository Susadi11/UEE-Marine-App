import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '@/components/Vindi/Search';
import { getAudioUrl } from '@/firebaseConfig'; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/Ionicons'; 
import { Audio } from 'expo-av';

interface Track {
  id: string;
  title: string;
  duration: string;
  imageUrl: string;
  filePath: string; // Add filePath for storage reference
}

const tracks: Track[] = [
  {
    id: '1',
    title: 'Calm Sea Waves',
    duration: '3:45',
    imageUrl: 'https://cache.desktopnexus.com/thumbseg/2397/2397774-bigthumbnail.jpg',
    filePath: 'audios/ocean-waves-white-noise1-13752.mp3', // Path in storage
  },
  {
    id: '2',
    title: 'Dolphin Calls',
    duration: '2:30',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAtANFORNBOtyQ-0-p_J-AHDLDHt0_upQLA&s',
    filePath:'audios/ocean-waves-white-noise1-13752.mp3',
  },
  {
    id: '3',
    title: 'Underwater Sounds',
    duration: '4:15',
    imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2023/09/21/Ocean-Underwater-Wallpaper-Graphics-79762400-1.jpg',
    filePath:'audios/ocean-waves-white-noise1-13752.mp3',
  },
  {
    id: '4',
    title: 'Underwater Ambience',
    duration: '2:30',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAtANFORNBOtyQ-0-p_J-AHDLDHt0_upQLA&s',
    filePath:'audios/ocean-waves-white-noise1-13752.mp3',
  },
  {
    id: '5',
    title: 'Relaxing Wave Sounds',
    duration: '4:15',
    imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2023/09/21/Ocean-Underwater-Wallpaper-Graphics-79762400-1.jpg',
    filePath:'audios/ocean-waves-white-noise1-13752.mp3',
  },

];

const SeaWaveTrack: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(tracks);
  const [sound, setSound] = useState<Audio.Sound | null>(null); // State for sound
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null); // State for currently playing track

  const handleSearch = () => {
    if (searchQuery) {
      const filteredData = tracks.filter((track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(filteredData);
    } else {
      setFilteredTracks(tracks);
    }
  };

  const playTrack = async (filePath: string, track: Track) => {
    try {
      // Stop any currently playing track
      if (sound) {
        await sound.stopAsync();
        setSound(null);
      }

      const audioUrl = await getAudioUrl(filePath); // Fetch audio URL
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setSound(newSound);
      setCurrentTrack(track); // Set current track
      await newSound.playAsync(); // Play the audio
    } catch (error) {
      console.error("Error loading or playing the track:", error);
    }
  };

  const renderTrack = ({ item }: { item: Track }) => (
    <View style={styles.trackContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.trackImage} />
      <View style={styles.trackDetails}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackDuration}>{item.duration}</Text>
      </View>
      <TouchableOpacity onPress={() => playTrack(item.filePath, item)}>
        <Ionicons name="play-circle-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Icon name="musical-notes" size={32} color="#fff" />
        <Text style={styles.headerTitle}>Sea Wawes Tracks</Text>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
      </View>
      <FlatList
        data={filteredTracks}
        renderItem={renderTrack}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      
      {/* Music Play Card */}
      {currentTrack && (
        <View style={styles.musicPlayCard}>
          <Image source={{ uri: currentTrack.imageUrl }} style={styles.musicPlayImage} />
          <View style={styles.musicPlayDetails}>
            <Text style={styles.musicPlayTitle}>{currentTrack.title}</Text>
            <Text style={styles.musicPlayDuration}>{currentTrack.duration}</Text>
          </View>
          <TouchableOpacity onPress={async () => {
            if (sound) {
              await sound.stopAsync();
              setSound(null);
              setCurrentTrack(null); // Clear current track when stopped
            }
          }}>
            <Ionicons name="stop-circle-outline" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Light background color
  },
  header: {
    backgroundColor: '#6C9EE5', // Matching favorite page style
    elevation: 5,
    shadowColor: '#000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  trackImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  trackDetails: {
    flex: 1,
    marginLeft: 16,
  },
  trackTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  trackDuration: {
    fontSize: 14,
    color: '#999',
  },
  listContent: {
    paddingBottom: 100,
    paddingHorizontal: 0,
  },
  musicPlayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#e6f7ff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignSelf: 'center',
  },
  musicPlayImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  musicPlayDetails: {
    flex: 1,
    marginLeft: 16,
  },
  musicPlayTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  musicPlayDuration: {
    fontSize: 14,
    color: '#999',
  },
});

export default SeaWaveTrack;
