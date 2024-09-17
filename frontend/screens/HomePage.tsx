import React from 'react';
import { View, StyleSheet } from 'react-native';
import Home from '@/components/home/Home';

const HomePage: React.FC = () => {
  return (
      <View style={styles.container}>
          <Home />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default HomePage;