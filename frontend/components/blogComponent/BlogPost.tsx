import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface BlogPostProps {
  onPress: () => void; // Ensure onPress is defined here
}

const BlogPost: React.FC<BlogPostProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>About Macbook</Text>
          <TouchableOpacity style={styles.icon} onPress={onPress}>
            <Icon name="arrow-up-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
        </Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>#Macbook</Text>
          <Text style={styles.tag}>#Apple</Text>
          <Text style={styles.tag}>#Laptop</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.readMore} onPress={onPress}>
            <Text style={styles.readMoreText}>Read More</Text>
            <Icon name="arrow-right" size={16} color="black" />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <AntDesign name="like2" size={20} color="black" style={styles.iconSpacing} />
            <AntDesign name="dislike2" size={20} color="black" style={[styles.iconSpacing, styles.dislikeIcon]} />
            <MaterialCommunityIcons name="share-outline" size={20} color="black" style={styles.iconSpacing} />
          </View>
        </View>
      </View>
    </TouchableOpacity>

    
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    borderRadius: 8,
    borderColor: '#d1d5db',
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10,
  },
  image: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    color: '#4b5563',
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
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 4,
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
