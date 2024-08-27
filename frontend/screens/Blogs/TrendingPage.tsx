import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrendingPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending Blogs</Text>
      {/* Add your content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default TrendingPage;
