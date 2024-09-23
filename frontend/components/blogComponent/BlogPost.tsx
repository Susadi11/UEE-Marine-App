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
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from 'firebase/firestore';
import { app } from '../../firebaseConfig'; // Make sure to import your Firebase config

interface BlogPostProps {
  id: string;
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

const BlogPost: React.FC<BlogPostProps> = ({
  id,
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
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const firestore = getFirestore(app);

  useEffect(() => {
    loadLikeStatus();
    loadCounts();
    animateEntry();
  }, []);

  const animateEntry = () => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  };

  const loadLikeStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(`@liked_${id}`);
      if (value !== null) {
        setLiked(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error loading like status:', error);
    }
  };

const loadCounts = async () => {
  try {
    const docRef = doc(firestore, 'blogPosts', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setLikeCount(Math.max(0, data?.likeCount || 0));
      setShareCount(Math.max(0, data?.shareCount || 0));
    } else {
      // Initialize with zeros if document doesn't exist
      setLikeCount(0);
      setShareCount(0);
    }
  } catch (error) {
    console.error('Error loading counts from Firebase:', error);
    // Initialize with zeros in case of error
    setLikeCount(0);
    setShareCount(0);
  }
};

  const saveLikeStatus = async (status: boolean) => {
    try {
      await AsyncStorage.setItem(`@liked_${id}`, JSON.stringify(status));
    } catch (error) {
      console.error('Error saving like status:', error);
    }
  };

  const updateFirebaseCounts = async (field: 'likeCount' | 'shareCount', change: number) => {
    try {
      const docRef = doc(firestore, 'blogPosts', id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const currentCount = docSnap.data()?.[field] || 0;
        const newCount = Math.max(0, currentCount + change);
        
        await updateDoc(docRef, {
          [field]: newCount
        });
  
        // Update local state
        if (field === 'likeCount') {
          setLikeCount(newCount);
        } else {
          setShareCount(newCount);
        }
      } else {
        // Document doesn't exist, create it with initial count of 1 (or 0 if unliking)
        const initialCount = Math.max(0, change);
        await setDoc(docRef, {
          [field]: initialCount
        });
  
        // Update local state
        if (field === 'likeCount') {
          setLikeCount(initialCount);
        } else {
          setShareCount(initialCount);
        }
      }
    } catch (error) {
      console.error('Error updating Firebase counts:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleLike = async () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    await saveLikeStatus(newLikedStatus);
  
    if (newLikedStatus) {
      await updateFirebaseCounts('likeCount', 1);
    } else {
      // Only decrease if current count is greater than 0
      
    }
  

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

  const handleShare = async () => {
    const shareMessage = `Check out this amazing blog post!\n\n${title}\n\n${introduction}\n\nBy ${authorName}\n\nTags: ${hashTags.join(', ')}\n\nCover photo: ${coverPhoto}\n\nRead more: [Your app or website URL]`;

    try {
      const result = await Share.share({
        message: shareMessage,
        title: title,
        url: coverPhoto, // This will work on iOS, but might not on Android
      });

      if (result.action === Share.sharedAction) {
        setShareCount(prevCount => prevCount + 1);
        await updateFirebaseCounts('shareCount', 1);
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

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
              <TouchableOpacity onPress={handleLike} style={styles.iconWrapper}>
                <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                  <Ionicons
                    name={liked ? 'heart' : 'heart-outline'}
                    size={24}
                    color={liked ? '#FF6B6B' : 'white'}
                    style={styles.iconSpacing}
                  />
                </Animated.View>
                <Text style={styles.countText}>{likeCount}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare} style={styles.iconWrapper}>
                <Ionicons
                  name="paper-plane-outline"
                  size={24}
                  color="white"
                  style={styles.iconSpacing}
                />
                <Text style={styles.countText}>{shareCount}</Text>
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
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    marginBottom: 16,
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
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    marginLeft: 16,
  },
  iconSpacing: {
    marginBottom: 4,
  },
  countText: {
    color: 'white',
    fontSize: 12,
  },
});

export default BlogPost;