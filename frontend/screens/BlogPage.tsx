import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Search from '../components/blogComponent/search'; // Adjust the path based on the actual location
import BlogPost from '@/components/blogComponent/BlogPost';

// Define the type for the navigation prop
type BlogPageNavigationProp = StackNavigationProp<{
  BlogPage: undefined;
  BlogDetail: undefined;
}>;

interface BlogPageProps {
  navigation: BlogPageNavigationProp;
}

const BlogPage: React.FC<BlogPageProps> = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('BlogDetail');
  };

  return (
    <View style={styles.container}>
      <Search />
      <BlogPost onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default BlogPage;
