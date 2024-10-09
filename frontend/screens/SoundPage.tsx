import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Card from '@/components/Vindi/Card';
import Category from '@/components/Vindi/Category';
import SearchBar from '@/components/Vindi/SearchBar';
import Card1 from '@/components/Vindi/Card1';
import Favourite from '@/screens/Favourite';

// Define the type for your stack navigation
type RootStackParamList = {
  Sound: undefined;
  Favourite: undefined;
  MusicHistory: undefined;
  SeaWaveTrack: undefined;
  MusicPlayer: undefined;
  MusicPlayer1: undefined;
  MusicPlayer2:undefined;
  MusicPlayer3:undefined;
  MusicPlayer4:undefined;
  // Add other routes here
};

// Define the navigation prop for this screen
type SoundScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Sound'>;

const Sound: React.FC = () => {
  const navigation = useNavigation<SoundScreenNavigationProp>(); // Using typed navigation
  const [activeTab, setActiveTab] = useState('All'); // Tracks the selected tab

  const categories = [
    { title: 'Sea Wave', imageUrl: 'https://cache.desktopnexus.com/thumbseg/2397/2397774-bigthumbnail.jpg', navigateTo: 'SeaWaveTrack' },
    { title: 'Dolphin Calls', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAtANFORNBOtyQ-0-p_J-AHDLDHt0_upQLA&s', navigateTo: 'SeaWaveTrack' },
    { title: 'Underwater', imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2023/09/21/Ocean-Underwater-Wallpaper-Graphics-79762400-1.jpg' },
    { title: 'Sea Waves + Piano Music', imageUrl: 'https://t3.ftcdn.net/jpg/06/34/38/26/360_F_634382619_pvMY6CtgERYA8401Zhf6HiwtWduWXLgp.jpg' },
  ];

  const cards = [
    { title: 'Relaxing with Ocean Waves', description: 'Sleep music, Stress Relief', imageUrl: 'https://t4.ftcdn.net/jpg/02/69/82/11/360_F_269821180_UAEWi4xE7JhAqOUvOD1JoBLP0YDvqFvA.jpg', navigateTo: 'MusicPlayer' },
    { title: 'Soothing music with nerves', description: 'Relieve Anxiety and Depression', imageUrl: 'https://r2.erweima.ai/imgcompressed/compressed_3fa29463650f93b31495a9d26c188435.webp', navigateTo: 'MusicPlayer1' },
    { title: 'Gentle Ocean waves birdsong', description: 'Anxiety and Depression', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cqyVqFGAZelNqFnSKNArYXJOqp-L16mMSl1hDBu5QwNLdGjCL4cYliHdewU2zVuup9g&usqp=CAU',navigateTo:'MusicPlayer2' },
    { title: 'Calm Marimba Music', description: 'Calm, Stress Relief and study', imageUrl: 'https://t3.ftcdn.net/jpg/02/50/04/62/360_F_250046250_a9bzhoJV6eHkewZ4fNsORF2buw45YAuz.jpg' },
  ];

  const card1 = [
    { title: 'Underwater Wonders + Relaxing Music', description: 'sleep, meditation, yoga, study.', imageUrl: 'https://t4.ftcdn.net/jpg/07/73/59/15/360_F_773591509_0jqWLDEOE0jlir1s3Tab735khb3TcXEu.jpg', navigateTo: 'MusicPlayer3' },
    { title: 'Healing songs of Dolphins & Whales', description: 'Deep Meditative Music for Harmony', imageUrl: 'https://assets.newatlas.com/dims4/default/41d7451/2147483647/strip/true/crop/1000x744+0+0/resize/1000x744!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fdolphinspeaker.jpg', navigateTo: 'MusicPlayer4' },
    { title: 'Deep Sleep with Calming Ocean Sounds', description: 'Waves Whispering ASMR For Sleeping', imageUrl: 'https://t4.ftcdn.net/jpg/06/28/19/89/360_F_628198974_t3XrQ03eTCM3Fcs7u0QNfm3JMhFB0YLw.jpg' },
    { title: 'Ocean Sounds For Deep Sleeping', description: 'Need To Fall Asleep', imageUrl: 'https://t3.ftcdn.net/jpg/02/50/04/62/360_F_250046250_a9bzhoJV6eHkewZ4fNsORF2buw45YAuz.jpg' },
  ];

  // Filter function for the search bar
  const filteredCards = cards;
  const filteredCard1 = card1;

  // FlatList for vertical scrolling, with ListHeaderComponent and ListFooterComponent
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <SearchBar />

          {/* Navigation Buttons: All, History, Favorite */}
          <View style={styles.navButtons}>
            {['All', 'Liked Musics', 'History'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.navButton, activeTab === tab && styles.activeNavButton]}
                onPress={() => {
                  setActiveTab(tab);
                  if (tab === 'Liked Musics') {
                    navigation.navigate('Favourite'); // Navigate to Favourite page
                  }
                  if (tab === 'History') {
                    navigation.navigate('MusicHistory'); // Navigate to Favourite page
                  }
                }}
              >
                <Text style={[styles.navButtonText, activeTab === tab && styles.activeNavButtonText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Horizontal Cards Section */}
          <Text style={styles.title}>Recommended for you</Text>
          <FlatList
            data={filteredCards}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                navigateTo={item.navigateTo}
              />
            )}
            keyExtractor={(item) => item.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />

          <Text style={styles.title}>Trending</Text>
          <FlatList
            data={filteredCard1}
            renderItem={({ item }) => (
              <Card1
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                navigateTo={item.navigateTo}
              />
            )}
            keyExtractor={(item) => item.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />

          <Text style={styles.title}>Categories</Text>
        </>
      }
      data={categories}
      renderItem={({ item }) => (
        <Category
          title={item.title}
          imageUrl={item.imageUrl}
          navigateTo={item.navigateTo}
        />
      )}
      keyExtractor={(item) => item.title}
      numColumns={2}
      columnWrapperStyle={styles.categoryRow}
      contentContainerStyle={styles.categoryList}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  activeNavButton: {
    backgroundColor: '#6C9EE5',
  },
  navButtonText: {
    fontSize: 16,
    color: '#333',
  },
  activeNavButtonText: {
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginLeft:10,
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
  categoryList: {
    paddingVertical: 10,
  },
  horizontalList: {
    paddingHorizontal: 10,
  },
});

export default Sound;
