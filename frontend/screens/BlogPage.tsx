// BlogPage.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import BlogPost from '@/components/blogComponent/BlogPost';
import Search from '@/components/blogComponent/search';
import Swiper from 'react-native-swiper';
import AddBlog from '@/components/blogComponent/AddBlog';
import TrendingPage from '@/screens/Blogs/TrendingPage';
import MyBlogPage from '@/screens/Blogs/MyBlogPage';

type BlogPageProps = {
  navigation: any; // Replace 'any' with the appropriate type if using TypeScript
};

const BlogPage: React.FC<BlogPageProps> = ({ navigation }) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const firestore = getFirestore(app);

  useEffect(() => {
    const blogCollection = collection(firestore, 'blogs');
    const unsubscribe = onSnapshot(
      blogCollection,
      (snapshot) => {
        const blogList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogList);
      },
      (error) => {
        console.error('Error fetching blogs: ', error);
        Alert.alert('Error', error.message || 'An unknown error occurred');
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  const handleTabPress = (tabName: string) => {
    const newIndex = tabName === 'AllBlogs' ? 0 : tabName === 'TrendingPage' ? 1 : 2;
    setActiveIndex(newIndex);
  };

  const handleAddPress = () => {
    setShowAddBlog(true);
  };

  const handleAddBlogClose = () => {
    setShowAddBlog(false);
  };

  const handleReadMore = (blogId: string) => {
    navigation.navigate('BlogDetail', { blogId });
  };

  const getActiveTab = () => {
    switch (activeIndex) {
      case 0:
        return 'AllBlogs';
      case 1:
        return 'TrendingPage';
      case 2:
        return 'MyBlogPage';
      default:
        return 'AllBlogs';
    }
  };

  return (
    <View style={styles.container}>
      {!showAddBlog && (
        <Search
          activeTab={getActiveTab()}
          onTabPress={handleTabPress}
          onAddPress={handleAddPress}
        />
      )}
      {showAddBlog ? (
        <AddBlog onClose={handleAddBlogClose} />
      ) : (
        <Swiper
          loop={false}
          showsPagination={false}
          index={activeIndex}
          onIndexChanged={handleIndexChange}
          scrollEnabled={true}
        >
          <ScrollView style={styles.page}>
            <View style={styles.blogList}>
              {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <BlogPost
                    key={blog.id}
                    coverPhoto={blog.blog_coverPhoto}
                    title={blog.blog_title}
                    introduction={blog.blog_category}
                    hashTags={blog.blog_hashtags || []}
                    authorName="Author Name"
                    authorImage="https://example.com/default-author-image.jpg"
                    date="Date"
                    onPress={() => handleReadMore(blog.id)} // Pass the function here
                  />
                ))
              ) : (
                <Text style={styles.noBlogsText}>No blogs available</Text>
              )}
            </View>
          </ScrollView>
          <ScrollView style={styles.page}>
            <TrendingPage />
          </ScrollView>
          <ScrollView style={styles.page}>
            <MyBlogPage />
          </ScrollView>
        </Swiper>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  blogList: {
    padding: 10,
  },
  noBlogsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BlogPage;
