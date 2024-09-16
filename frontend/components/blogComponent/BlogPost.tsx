import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
        <View style={styles.tags}>
          {hashTags.map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag}</Text>
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.authorInfo}>
            <Image
              source={{ uri: authorImage }}
              style={styles.authorImage}
            />
            <View>
              <Text style={styles.authorName}>{authorName}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleLike}>
              <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                <AntDesign name="like2" size={20} color="black" style={styles.iconSpacing} />
              </Animated.View>
            </TouchableOpacity>
            <AntDesign name="dislike2" size={20} color="black" style={[styles.iconSpacing, styles.dislikeIcon]} />
            <MaterialCommunityIcons name="share-outline" size={20} color="black" style={styles.iconSpacing} />
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
    backgroundColor: 'white', // Ensure the background remains white
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
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginHorizontal: 8,
  },
  dislikeIcon: {
    marginLeft: 16,
  },
});

export default BlogPost;
