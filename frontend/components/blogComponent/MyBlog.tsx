import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

interface BlogPostProps {
  coverPhoto: string;
  title: string;
  introduction: string;
  hashTags: string[];
  authorName: string;
  authorImage: string;
  date: string;
  onPress: () => void;
}

const { width } = Dimensions.get('window');

const MyBlog: React.FC<BlogPostProps> = ({
  coverPhoto,
  title,
  introduction,
  hashTags,
  authorName,
  authorImage,
  date,
  onPress,
}) => {
  const [liked, setLiked] = useState(false);
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const handleLike = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleShare = () => {
    console.log('Share button pressed');
  };

  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <Animated.View style={[styles.container, { opacity: animatedOpacity }]}>
      <Image source={{ uri: coverPhoto }} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {introduction}
          </Text>
          <View style={styles.footer}>
            <TouchableOpacity onPress={onPress} style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleLike}>
                <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                  <Ionicons
                    name={liked ? 'heart' : 'heart-outline'}
                    size={24}
                    color={liked ? 'red' : 'white'}
                    style={styles.iconSpacing}
                  />
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare}>
                <Ionicons
                  name="paper-plane-outline"
                  size={24}
                  color="white"
                  style={styles.iconSpacing}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 300,
    borderRadius: 30,
    overflow: 'hidden',
    marginVertical: 16,
    marginHorizontal: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    fontFamily: 'Inter_700Bold',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  readMoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 16,
  },
});

export default MyBlog;