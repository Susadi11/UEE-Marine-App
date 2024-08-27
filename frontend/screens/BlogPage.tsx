import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import BlogPost from '@/components/blogComponent/BlogPost';
import Search from '@/components/blogComponent/search';
import { BlogPageNavigationProp } from '@/components/navigation/types'; // Adjust the path based on your file structure

interface BlogPageProps {
  navigation: BlogPageNavigationProp;
}

const BlogPage: React.FC<BlogPageProps> = ({ navigation }) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const firestore = getFirestore(app);

  useEffect(() => {
    // Set up real-time listener for the 'blogs' collection
    const blogCollection = collection(firestore, 'blogs');
    const unsubscribe = onSnapshot(blogCollection, snapshot => {
      const blogList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogList);
    }, error => {
      console.error('Error fetching blogs: ', error);
      Alert.alert('Error', error.message || 'An unknown error occurred');
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [firestore]);

  return (
    <View style={styles.container}>
      <Search />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {blogs && blogs.length > 0 ? (
          blogs.map(blog => (
            <BlogPost
              key={blog.id}
              coverPhoto={blog.blog_coverPhoto}
              title={blog.blog_title}
              introduction={blog.blog_category}
              hashTags={blog.blog_hashtags || []}
              authorName="Author Name" // Replace with dynamic author info if available
              authorImage="https://example.com/default-author-image.jpg" // Replace with dynamic author image if available
              date="Date" // Replace with dynamic date info if available
              onPress={() => {
                navigation.navigate('BlogDetail', { blogId: blog.id });
              }}
            />
          ))
        ) : (
          <View style={styles.noBlogsContainer}>
            <Text style={styles.noBlogsText}>No blogs available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  noBlogsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBlogsText: {
    fontSize: 16,
    color: '#666',
  },
});

export default BlogPage;
