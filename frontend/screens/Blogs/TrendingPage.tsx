import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getFirestore, collection, onSnapshot, query, limit } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import BlogPost from '@/components/blogComponent/BlogPost';

interface Blog {
  id: string;
  coverPhoto: string;
  title: string;
  introduction: string;
  hashTags: string[];
  authorName: string;
  authorImage: string;
  date: string;
  likeCount: number;
  shareCount: number;
  trendingScore: number;
}

const TrendingPage: React.FC = () => {
  const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const firestore = getFirestore(app);
    const blogsRef = collection(firestore, 'blogs');
    const blogsQuery = query(blogsRef, limit(100));

    const unsubscribe = onSnapshot(blogsQuery, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const mergedBlogs = blogs.map((blog: any) => ({
        id: blog.id,
        coverPhoto: blog.blog_coverPhoto || 'https://example.com/default-cover.jpg',
        title: blog.blog_title || 'Untitled',
        introduction: blog.blog_category || 'No introduction available',
        hashTags: blog.blog_hashtags || [],
        authorName: blog.authorName || 'Unknown Author',
        authorImage: blog.authorImage || 'https://example.com/default-author-image.jpg',
        date: blog.date ? new Date(blog.date.seconds * 1000).toLocaleDateString() : 'Unknown Date',
        likeCount: blog.likeCount || 0,
        shareCount: blog.shareCount || 0,
        trendingScore: (blog.likeCount || 0) + (blog.shareCount || 0),
      }));

      // Sort by trending score
      mergedBlogs.sort((a, b) => b.trendingScore - a.trendingScore);
      const topTrendingBlogs = mergedBlogs.slice(0, 20);

      setTrendingBlogs(topTrendingBlogs);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const renderBlogPost = ({ item }: { item: Blog }) => {
    return (
      <View style={styles.blogPostContainer}>
        <BlogPost
          id={item.id}
          coverPhoto={item.coverPhoto}
          title={item.title}
          introduction={item.introduction}
          hashTags={item.hashTags}
          authorName={item.authorName}
          authorImage={item.authorImage}
          date={item.date}
          onPress={() => {
            console.log(`Pressed blog with id: ${item.id}`);
            // Handle navigation to blog detail page
          }}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Top 20 Trending Blogs</Text>
      {trendingBlogs.length > 0 ? (
        <FlatList
          data={trendingBlogs}
          renderItem={renderBlogPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noBlogs}>No trending blogs available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    padding: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  blogPostContainer: {
    marginBottom: 16,
  },
  noBlogs: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TrendingPage;
