import * as React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const Card: React.FC<{ title: string, description: string, imageUrl: string }> = ({ title, description, imageUrl }) => {
  return (
    <View style={styles.card}>
      <ImageBackground 
        style={styles.cardImage} 
        source={{ uri: imageUrl }} 
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 210,
    marginHorizontal: 3,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
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
});

export default Card;
