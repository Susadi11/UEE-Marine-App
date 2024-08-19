import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface TrackPlayerProps {
  title: string;
  albumCover: string;
  navigateTo?: string;
}

const TrackPlayer: React.FC<TrackPlayerProps> = ({ title, albumCover, navigateTo }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isLiked, setIsLiked] = useState(false);

  const handleBackPress = () => {
    navigation.goBack(); // This will navigate to the previous screen
  };

  const handleHeartPress = () => {
    setIsLiked(!isLiked);
  };

  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-left" size={30} color="white" />
      </TouchableOpacity>
      <Image
        source={{ uri: albumCover }}
        style={styles.albumCover}
        alt={title}
      />
      <Text style={styles.songTitle}>{title}</Text>
      <Text>Ocean Sounds to Sleep, Study and Chill</Text>

      <TouchableOpacity style={styles.heartButton} onPress={handleHeartPress}>
        <Icon name={isLiked ? 'heart' : 'heart-o'} size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    marginBottom:10,
    left: 10,
    padding: 5,
    zIndex: 1,
  },
  albumCover: {
    width: 360,
    height: 360,
    borderRadius: 8,
    marginBottom: 10,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  heartButton: {
    marginTop: 10,
  },
});

export default TrackPlayer;
