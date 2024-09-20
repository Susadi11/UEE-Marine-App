import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing icons
import { FontAwesome } from '@expo/vector-icons'; // Importing additional icons

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  navigateTo?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, navigateTo }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo as never);
    }
  };

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  const handleAddToFavorites = () => {
    console.log(`${title} added to favorites`);
    setMenuVisible(false);
  };

  const handleAddToQueue = () => {
    console.log(`${title} added to queue`);
    setMenuVisible(false);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.card}>
        <ImageBackground
          style={styles.cardImage}
          source={{ uri: imageUrl }}
          imageStyle={{ borderRadius: 10 }}
        >
          {/* 3-dot icon */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleMenuToggle}>
              <Icon name="more-vert" size={24} color="white" />
            </TouchableOpacity>

            {/* Conditional rendering of the dropdown menu */}
            {menuVisible && (
              <View style={styles.menu}>
                <TouchableOpacity onPress={handleAddToFavorites} style={styles.menuItem}>
                  <FontAwesome name="star" size={16} color="#333" />
                  <Text style={styles.menuText}> Add to Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddToQueue} style={styles.menuItem}>
                  <Icon name="queue" size={16} color="#333" />
                  <Text style={styles.menuText}> Add to Queue</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Card text */}
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 190,
    height: 200,
    marginHorizontal: 3,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDescription: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  menu: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: 70,
    width: 140,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuText: {
    paddingLeft: 5,
    fontSize: 10,
    color: '#333',
  },
});

export default Card;
