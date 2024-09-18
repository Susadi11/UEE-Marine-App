import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from '@/components/Vindi/Search';

interface Track {
  id: string;
  title: string;
  duration: string;
  imageUrl: string;
}

const tracks: Track[] = [
  {
    id: '1',
    title: 'Calm Sea Waves',
    duration: '3:45',
    imageUrl: 'https://cache.desktopnexus.com/thumbseg/2397/2397774-bigthumbnail.jpg',
  },
  {
    id: '2',
    title: 'Dolphin Calls',
    duration: '2:30',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAtANFORNBOtyQ-0-p_J-AHDLDHt0_upQLA&s',
  },
  {
    id: '3',
    title: 'Underwater Sounds',
    duration: '4:15',
    imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2023/09/21/Ocean-Underwater-Wallpaper-Graphics-79762400-1.jpg',
  },
  {
    id: '4',
    title: 'Underwater Ambience',
    duration: '2:30',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAtANFORNBOtyQ-0-p_J-AHDLDHt0_upQLA&s',
  },
  {
    id: '5',
    title: 'Relaxing Wave Sounds',
    duration: '4:15',
    imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2023/09/21/Ocean-Underwater-Wallpaper-Graphics-79762400-1.jpg',
  },
  // Add more tracks as needed
];

const SeaWaveTrack: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(tracks);

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

  const renderTrack = ({ item }: { item: Track }) => (
    <View style={styles.trackContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.trackImage} />
      <View style={styles.trackDetails}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackDuration}>{item.duration}</Text>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play-circle-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
      <FlatList
        data={filteredTracks}
        renderItem={renderTrack}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  trackDetails: {
    flex: 1,
    marginLeft: 16,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  trackDuration: {
    fontSize: 14,
    color: '#666',
  },
  playButton: {
    marginLeft: 16,
  },
});

export default SeaWaveTrack;