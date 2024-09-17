import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const EventShow = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Hero section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Explore Our Marine Events</Text>
          <Text style={styles.heroSubtitle}>
          Dive into exciting activities, conservation efforts, and community gatherings that celebrate the wonders of the ocean
          </Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heroButton2}>
          <Text style={styles.heroButtonText2}>Events</Text>
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
              World Oceans Day is celebrated annually on June 8. It’s a global event dedicated to celebrating the ocean, raising awareness 
              about its importance, and promoting actions to protect and sustain it.
              </Text>
               
              </View>
            </View>
          </View>

          {/* Add more products as needed */}
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
    backgroundColor: '#1E40AF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'column', // Changed to column for mobile layout
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  heroButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  heroButtonText: {
    color: '#1E40AF',
    fontWeight: 'bold',
  },
  heroButton2: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  heroButtonText2: {
    color: '#1E40AF',
    fontWeight: 'bold',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  featuredSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  productGrid: {
    flexDirection: 'column', // Adjusted for mobile, no grid layout
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  addButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EventShow;
