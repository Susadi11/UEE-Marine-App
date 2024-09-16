import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const BlogPost: React.FC<BlogPostProps> = ({ coverPhoto, title, introduction, hashTags, authorName, authorImage, date, onPress }) => {
  const [liked, setLiked] = useState(false);
  const animatedScale = new Animated.Value(1);

  const handleLike = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleShare = () => {
    // Add the functionality to share here
    console.log('Share button pressed');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: coverPhoto }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {introduction}
        </Text>
        <View style={styles.footer}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleLike}>
              <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                <Ionicons
                  name={liked ? 'heart' : 'heart-outline'}
                  size={30}
                  color={liked ? 'red' : 'black'}
                  style={styles.iconSpacing}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
              <Ionicons name="paper-plane-outline" size={30} color="black" style={styles.iconSpacing} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 16,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  content: {
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  readMore: {
    color: '#3b82f6',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  tags: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginHorizontal: 8,
  },
});

export default BlogPost;
