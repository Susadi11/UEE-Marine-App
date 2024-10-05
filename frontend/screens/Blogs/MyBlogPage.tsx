import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import MyBlog from '@/components/blogComponent/MyBlog';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

type RootStackParamList = {
  BlogDetail: { blogData: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BlogDetail'>;

const MyBlogPage: React.FC = () => {
  const [myBlogs, setMyBlogs] = useState<any[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const firestore = getFirestore(app);
  const navigation = useNavigation<NavigationProp>();
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    const blogCollection = collection(firestore, 'blogs');
    const unsubscribe = onSnapshot(
      blogCollection,
      (snapshot) => {
        const blogList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMyBlogs(blogList);
      },
      (error) => {
        console.error('Error fetching blogs: ', error);
        Alert.alert('Error', 'Failed to fetch blogs');
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  const handleReadMore = (blogId: string) => {
    const selectedBlog = myBlogs.find(blog => blog.id === blogId);
    if (selectedBlog) {
      navigation.navigate('BlogDetail', { blogData: selectedBlog });
    } else {
      console.error('Blog not found:', blogId);
      Alert.alert('Error', 'Failed to load blog details');
    }
  };

  const handleEdit = (blogId: string) => {
    // Implement edit functionality
    console.log('Edit blog:', blogId);
    setSelectedBlogId(null);
  };

  const handleDelete = async (blogId: string) => {
    try {
      await deleteDoc(doc(firestore, 'blogs', blogId));
      console.log('Blog deleted:', blogId);
      setSelectedBlogId(null);
    } catch (error) {
      console.error('Error deleting blog:', error);
      Alert.alert('Error', 'Failed to delete the blog');
    }
  };

  const renderContextMenu = (blogId: string) => {
    if (selectedBlogId !== blogId) return null;

    if (!fontsLoaded) {
      return null; // or a loading indicator
    }

    return (
      <View style={styles.contextMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleEdit(blogId)}>
          <Ionicons name="create-outline" size={20} color="#4b5563" />
          <Text style={styles.menuItemText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleDelete(blogId)}>
          <Ionicons name="trash-outline" size={20} color="#4b5563" />
          <Text style={styles.menuItemText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Blogs</Text>
      <View style={styles.blogList}>
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <View key={blog.id} style={styles.blogContainer}>
              <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => setSelectedBlogId(selectedBlogId === blog.id ? null : blog.id)}
              >
                <Ionicons name="ellipsis-vertical" size={24} color="#4b5563" />
              </TouchableOpacity>
              {renderContextMenu(blog.id)}
              <MyBlog
                coverPhoto={blog.blog_coverPhoto}
                title={blog.blog_title}
                introduction={blog.blog_category}
                hashTags={blog.blog_hashtags || []}
                authorName="Author Name"
                authorImage="https://example.com/default-author-image.jpg"
                date={blog.createdAt ? new Date(blog.createdAt.toDate()).toLocaleDateString() : 'Unknown date'}
                onPress={() => handleReadMore(blog.id)}
              />
            </View>
          ))
        ) : (
          <Text style={styles.noBlogsText}>No blogs available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    padding: 16,
    fontFamily: 'Inter_700Bold',
  },
  blogList: {
  },
  blogContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  menuIcon: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 5,
  },
  contextMenu: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuItemText: {
    marginLeft: 10,
    color: '#4b5563',
    fontFamily: 'Inter_600SemiBold',
  },
  noBlogsText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyBlogPage;