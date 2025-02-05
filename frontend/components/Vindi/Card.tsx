import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import { collection, addDoc } from "firebase/firestore";  // Firestore methods
import { db } from '@/firebaseConfig';  // Firestore database instance

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

  const handleAddToFavorites = async () => {
    try {
      // Firestore collection reference
      const favoritesCollection = collection(db, "favorites");

      // Add document to Firestore
      await addDoc(favoritesCollection, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        addedAt: new Date().toISOString(), // Store the date when added to favorites
      });

      console.log(`${title} added to favorites`);
      setMenuVisible(false);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
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
    height: 180,
    marginHorizontal: 3,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
    marginBottom: 15,
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
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDescription: {
    fontSize: 10,
    color: 'white',
    marginTop: 5,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 4,
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
    height: 45,
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
