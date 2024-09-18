import * as React from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '@/components/Vindi/Card';
import Category from '@/components/Vindi/Category';

const Sound: React.FC = () => {
  const navigation = useNavigation();

  const categories = [
    { title: 'Sea Wave', imageUrl: 'https://cache.desktopnexus.com/thumbseg/2397/2397774-bigthumbnail.jpg', navigateTo: 'SeaWaveTrack' },
    { title: 'Dolphin Calls', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAtANFORNBOtyQ-0-p_J-AHDLDHt0_upQLA&s',navigateTo:'SeaWaveTrack' },
    { title: 'Underwater', imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2023/09/21/Ocean-Underwater-Wallpaper-Graphics-79762400-1.jpg' },
    { title: 'Sea Waves + Piano Music', imageUrl: 'https://t3.ftcdn.net/jpg/06/34/38/26/360_F_634382619_pvMY6CtgERYA8401Zhf6HiwtWduWXLgp.jpg' },
    { title: 'Sea Animal Sounds', imageUrl: 'https://i.pinimg.com/736x/ff/af/03/ffaf03f6c7bfad3c90f02d5207847793.jpg' },
    { title: 'Underwater Music + Piano', imageUrl: 'https://static.vecteezy.com/system/resources/previews/022/843/793/non_2x/under-water-ocean-background-landscape-generative-ai-photo.jpg' },
    { title: 'Meditative Sounds of the Sea', imageUrl: 'https://www.pixelstalk.net/wp-content/uploads/images6/Relaxing-Wallpaper-HD-Free-download.jpg' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended for you</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.categoryRow} showsHorizontalScrollIndicator={false}>
        <Card 
          title="Relaxing with Ocean Waves" 
          description="Sleep music, Stress Relief" 
          imageUrl='https://i.pinimg.com/736x/76/27/b1/7627b146303d3bd73c057e04cba9a3a7.jpg' 
          navigateTo="MusicPlayer"
        />
        <Card 
          title="Soothing music with nerves" 
          description="Relieve Anxiety and Depression." 
          imageUrl='https://wallpapers.com/images/featured/underwater-9mpre0hzrqth75ag.jpg' 
        />
        <Card 
          title="Underwater Ambience" 
          description="Deep music Relaxing, Sleep music" 
          imageUrl='https://wallpapercave.com/wp/wp6566448.jpg' 
        />
        <Card 
          title="Relaxing waves sounds" 
          description="Meditation, Fall asleep, Stress relief" 
          imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKCzPCDjzixJfvW4rFlbUazxdNMUCsxqcKEb2U2NjKSCt9t0A0XV3liZnQ8YDqsfBPJg&usqp=CAU' 
        />
        <Card 
          title="Low pitch ocean music" 
          description="Fall asleep with relaxing waves" 
          imageUrl='https://e0.pxfuel.com/wallpapers/18/248/desktop-wallpaper-the-big-blue-wave-blue-sea-big-wave-ocean.jpg' 
        />
      </ScrollView>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    marginTop: 20,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  categoryList: {
    paddingVertical: 5,
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
});

export default Sound;
