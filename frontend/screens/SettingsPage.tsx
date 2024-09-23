import React from 'react';
import { View, StyleSheet } from 'react-native';
import Settings from '@/components/home/Settings';

const SettingsPage: React.FC = () => {
  return (
      <View style={styles.container}>
         <Settings/>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default SettingsPage;