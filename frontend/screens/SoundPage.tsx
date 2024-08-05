import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const Card: React.FC<{ title: string, description: string, imageUrl: string }> = ({ title, description, imageUrl }) => {
  return (
    <View style={styles.card}>
      <Image 
        style={styles.cardImage} 
        source={{ uri: imageUrl }} 
      />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const HomePage: React.FC = () => {
  const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vsByhFeOrPgx4ikajO6k8cb6aZPOYcK6uw&s';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Page</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.cardsContainer} showsHorizontalScrollIndicator={false}>
        <Card title="Card 1" description="This is the first card." imageUrl={imageUrl} />
        <Card title="Card 2" description="This is the second card." imageUrl={imageUrl} />
        <Card title="Card 3" description="This is the third card." imageUrl={imageUrl} />
        <Card title="Card 4" description="This is the fourth card." imageUrl={imageUrl} />
        <Card title="Card 5" description="This is the fifth card." imageUrl={imageUrl} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginTop: 30,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  card: {
    width: 200,
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomePage;

