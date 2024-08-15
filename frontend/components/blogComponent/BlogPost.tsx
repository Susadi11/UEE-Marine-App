import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

interface BlogPostProps {
  onPress: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ onPress }) => {
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
        source={{ uri: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
        style={styles.image}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      >
       
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>About Macbook</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quod.
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
        <View style={styles.tags}>
          <Text style={styles.tag}>#Macbook</Text>
          <Text style={styles.tag}>#Apple</Text>
          <Text style={styles.tag}>#Laptop</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.authorInfo}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.authorImage}
            />
            <View>
              <Text style={styles.authorName}>John Doe</Text>
              <Text style={styles.date}>May 20, 2023</Text>
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
    borderRadius: 16,
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    justifyContent: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  content: {
    padding: 16,
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
