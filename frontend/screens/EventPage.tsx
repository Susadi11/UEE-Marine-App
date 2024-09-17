import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const EventPage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* Hero section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Explore Our Marine Events</Text>
          <Text style={styles.heroSubtitle}>
            Dive into exciting activities, conservation efforts, and community gatherings that celebrate the wonders of the ocean.
          </Text>
          <TouchableOpacity
                style={styles. heroButton}
                onPress={() => navigation.navigate('ExploreEvents')}
            >
                <Text style={styles.heroButton}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('EventAdd')}
            >
                <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>

        </View>
        <Image
          source={{ uri: 'https://plus.unsplash.com/premium_photo-1666286163385-abe05f0326c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG9jZWFufGVufDB8fDB8fHww' }}
          style={styles.heroImage}
        />
      </View>

      {/* Featured section */}
      <View style={styles.featuredSection}>
        <Text style={styles.sectionTitle}>Marine Events Highlights</Text>
        <View style={styles.productGrid}>
          {/* Product 1 */}
          <View style={styles.productCard}>
            <Image
              source={{ uri: 'https://i.pinimg.com/originals/fd/40/83/fd408327a49b04865e17663d881c751c.jpg' }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>World's Beach Cleanup Day</Text>
              <Text style={styles.productDescription}>
                World Beach Cleanup Day is celebrated annually on September 16. It is part of a global effort to clean up coastlines, promote 
                marine conservation, and raise awareness about the impact of ocean pollution.
              </Text>
            </View>
          </View>

          {/* Product 2 */}
          <View style={styles.productCard}>
            <Image
              source={{ uri: 'https://im.indiatimes.in/content/2023/Jun/World-Ocean-Day-posters11_6480e818bd566.jpg' }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>World's Ocean Day</Text>
              <Text style={styles.productDescription}>
                World Oceans Day is celebrated annually on June 8. It’s a global event dedicated to celebrating the ocean, raising awareness about its importance, and promoting actions to protect and sustain it.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    position: 'relative',
    height: 300,
  },
  heroContent: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    maxWidth: '60%',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10,
  },
  heroButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  heroButton2: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:5,
    
  },
  heroButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  heroButtonText2: {
    color: '#000',
    fontSize: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:60,
  },
  productGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#33bbff',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 230,
    right:-150,
    elevation: 8,
},
fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
},
});

export default EventPage;
