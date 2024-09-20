import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '@/components/Vindi/Card';
import Category from '@/components/Vindi/Category';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '@/components/Vindi/SearchBar'; // Import the new SearchBar component

const Sound: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All'); // Tracks the selected tab

  const categories = [
    { title: 'Sea Wave', imageUrl: 'https://cache.desktopnexus.com/thumbseg/2397/2397774-bigthumbnail.jpg', navigateTo: 'SeaWaveTrack' },
    { title: 'Dolphin Calls', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAtANFORNBOtyQ-0-p_J-AHDLDHt0_upQLA&s', navigateTo: 'SeaWaveTrack' },
    { title: 'Underwater', imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2023/09/21/Ocean-Underwater-Wallpaper-Graphics-79762400-1.jpg' },
    { title: 'Sea Waves + Piano Music', imageUrl: 'https://t3.ftcdn.net/jpg/06/34/38/26/360_F_634382619_pvMY6CtgERYA8401Zhf6HiwtWduWXLgp.jpg' },
    { title: 'Sea Animal Sounds', imageUrl: 'https://i.pinimg.com/736x/ff/af/03/ffaf03f6c7bfad3c90f02d5207847793.jpg' },
    { title: 'Underwater Music + Piano', imageUrl: 'https://static.vecteezy.com/system/resources/previews/022/843/793/non_2x/under-water-ocean-background-landscape-generative-ai-photo.jpg' },
    { title: 'Meditative Sounds of the Sea', imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/images6/Relaxing-Wallpaper-HD-Free-download.jpg' },
  ];

  const cards = [
    { title: 'Relaxing with Ocean Waves', description: 'Sleep music, Stress Relief', imageUrl: 'https://t4.ftcdn.net/jpg/02/69/82/11/360_F_269821180_UAEWi4xE7JhAqOUvOD1JoBLP0YDvqFvA.jpg', navigateTo: 'MusicPlayer' },
    { title: 'Soothing music with nerves', description: 'Relieve Anxiety and Depression', imageUrl: 'https://r2.erweima.ai/imgcompressed/compressed_3fa29463650f93b31495a9d26c188435.webp', navigateTo: 'MusicPlayer1' },
    { title: 'Gentle Ocean wawes birdsong', description: 'Anxiety and Depression', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7cqyVqFGAZelNqFnSKNArYXJOqp-L16mMSl1hDBu5QwNLdGjCL4cYliHdewU2zVuup9g&usqp=CAU' },
    { title: 'Calm Marimba Music', description: 'Calm,Stress Relief and study', imageUrl: 'https://t3.ftcdn.net/jpg/02/50/04/62/360_F_250046250_a9bzhoJV6eHkewZ4fNsORF2buw45YAuz.jpg' },
   
    ];

  // Filter function for the search bar
  const filteredCards = cards; // Remove the old search query filtering logic (SearchBar handles it now)

  return (
    <ScrollView style={styles.container}>
      {/* Custom Search Bar */}
      <SearchBar />

      {/* Navigation Buttons: All, History, Favorite */}
      <View style={styles.navButtons}>
        {['All', 'Liked Musics', 'History'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.navButton, activeTab === tab && styles.activeNavButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.navButtonText, activeTab === tab && styles.activeNavButtonText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Cards Section */}
      <Text style={styles.title}>Recommended for you</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.categoryRow} showsHorizontalScrollIndicator={false}>
        {filteredCards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            navigateTo={card.navigateTo}
          />
        ))}
      </ScrollView>

      {/* Categories Section */}
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => 
          <Category 
            title={item.title} 
            imageUrl={item.imageUrl} 
            navigateTo={item.navigateTo}
          />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.categoryRow}
        contentContainerStyle={styles.categoryList}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
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
    backgroundColor: '#2196F3',
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
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
  categoryList: {
    paddingVertical: 10,
  },
});

export default Sound;
