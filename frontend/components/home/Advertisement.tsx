import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';

const Advertisement: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const advertisements = [
    {
      title: 'Add Events Easily',
      description: 'Premium users can add and manage events like beach cleanups or conferences with ease!',
      icon: 'event',
    },
    {
      title: 'Set Ocean Sound Timers',
      description: 'Enjoy and set timers for relaxing ocean sounds. Only for premium users!',
      icon: 'timer',
    },
    {
      title: 'Explore Locations',
      description: 'Discover ocean conservation events and locations with premium access!',
      icon: 'location-on',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotPress = (index: number) => {
    setCurrentAdIndex(index);
  };

  const handleActivateNow = () => {
    navigation.navigate('PremiumPage' as never);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.adContainer}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={advertisements[currentAdIndex].icon as any} size={32} color="#6C9EE5" />
        </View>
        <Text style={styles.adTitle}>{advertisements[currentAdIndex].title}</Text>
        <Text style={styles.adDescription}>{advertisements[currentAdIndex].description}</Text>
        <TouchableOpacity onPress={handleActivateNow} style={styles.activateButton}>
          <Text style={styles.activateButtonText}>Activate Now</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.dotsContainer}>
        {advertisements.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            style={styles.dotTouchable}
          >
            <View
              style={[
                styles.dot,
                { backgroundColor: currentAdIndex === index ? '#6C9EE5' : '#E0E0E0' },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    padding: 24,
    borderRadius: 30,
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    backgroundColor: '#F5F8FF',
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
  },
  adTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
  },
  adDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  activateButton: {
    backgroundColor: '#6C9EE5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  activateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  dotTouchable: {
    padding: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default Advertisement;