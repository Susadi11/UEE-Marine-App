import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type TabBarProps = {
  activeTab: string;
  onTabPress: (tabName: string) => void;
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabButton} onPress={() => onTabPress('AllBlogs')}>
        <Icon name="list" size={30} color={activeTab === 'AllBlogs' ? 'blue' : '#000'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => onTabPress('TrendingPage')}>
        <Icon name="trending-up" size={30} color={activeTab === 'TrendingPage' ? 'blue' : '#000'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => onTabPress('MyBlogPage')}>
        <Icon name="person" size={30} color={activeTab === 'MyBlogPage' ? 'blue' : '#000'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   
  },
  tabButton: {
    alignItems: 'center',
  },
});

export default TabBar;
