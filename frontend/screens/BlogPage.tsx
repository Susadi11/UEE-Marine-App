import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { getFirestore, collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import BlogPost from '@/components/blogComponent/BlogPost';
import Search from '@/components/blogComponent/search';
import Swiper from 'react-native-swiper';
import AddBlog from '@/components/blogComponent/AddBlog';
import TrendingPage from '@/screens/Blogs/TrendingPage';
import MyBlogPage from '@/screens/Blogs/MyBlogPage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

type BlogPageProps = {
  navigation: any; // Replace 'any' with the appropriate type if using TypeScript
};

const BlogPage: React.FC<BlogPageProps> = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const firestore = getFirestore(app);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
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
    }
  }, [firestore, isFocused]);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  const handleTabPress = (tabName: string) => {
    const newIndex = tabName === 'AllBlogs' ? 0 : tabName === 'TrendingPage' ? 1 : 2;
    setActiveIndex(newIndex);
  };

  const handleAddPress = () => {
    navigation.navigate('AddBlog', { isEditing: false });
  };

  const handleReadMore = async (blogId: string) => {
    try {
      const docRef = doc(firestore, 'blogs', blogId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const blogData = docSnap.data();
        navigation.navigate('BlogDetail', { blogData });
      } else {
        console.log("No such document!");
        Alert.alert("Error", "Blog post not found");
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      Alert.alert("Error", "Failed to load blog details");
    }
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
      <Search
        activeTab={getActiveTab()}
        onTabPress={handleTabPress}
        onAddPress={handleAddPress}
      />
      <Swiper
        loop={false}
        showsPagination={false}
        index={activeIndex}
        onIndexChanged={handleIndexChange}
        scrollEnabled={true}
      >
        <ScrollView 
          style={styles.page}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.blogList}>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogPost
                  key={blog.id}
                  id={blog.id}
                  coverPhoto={blog.blog_coverPhoto}
                  title={blog.blog_title}
                  introduction={blog.blog_category}
                  hashTags={blog.blog_hashtags || []}
                  authorName="Author Name"
                  authorImage="https://example.com/default-author-image.jpg"
                  date="Date"
                  onPress={() => handleReadMore(blog.id)}
                />
              ))
            ) : (
              <Text style={styles.noBlogsText}>No blogs available</Text>
            )}
          </View>
        </ScrollView>
        <ScrollView 
          style={styles.page}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <TrendingPage />
        </ScrollView>
        <ScrollView 
          style={styles.page}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <MyBlogPage />
        </ScrollView>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // bg-gray-100
  },
  page: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 100, // Adjust padding as needed
  },
  blogList: {
   
  },
  noBlogsText: {
    fontSize: 16,
    color: '#4b5563', // text-gray-600
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
  blogPost: {
    backgroundColor: '#ffffff', // bg-white
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  blogCoverPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  blogContent: {
    padding: 16,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937', // text-gray-800
    marginBottom: 8,
  },
  blogIntroduction: {
    fontSize: 14,
    color: '#4b5563', // text-gray-600
    marginBottom: 8,
  },
  hashTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  hashTag: {
    backgroundColor: '#e5e7eb', // bg-gray-200
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  hashTagText: {
    fontSize: 12,
    color: '#4b5563', // text-gray-600
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937', // text-gray-800
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280', // text-gray-500
    marginLeft: 'auto',
  },
  readMoreButton: {
    backgroundColor: '#3b82f6', // bg-blue-500
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  readMoreButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default BlogPage;
