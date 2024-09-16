import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type TabBarProps = {
  activeTab: string;
  onTabPress: (tabName: string) => void;
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => onTabPress('AllBlogs')}
      >
        <Icon 
          name="list" 
          size={30} 
          color={activeTab === 'AllBlogs' ? '#2196F3' : '#757575'} 
        />
        {activeTab === 'AllBlogs' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => onTabPress('TrendingPage')}
      >
        <Icon 
          name="trending-up" 
          size={30} 
          color={activeTab === 'TrendingPage' ? '#2196F3' : '#757575'} 
        />
        {activeTab === 'TrendingPage' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.tabButton} 
        onPress={() => onTabPress('MyBlogPage')}
      >
        <MaterialCommunityIcons
          name="account-outline"
          size={30}
          color={activeTab === 'MyBlogPage' ? '#2196F3' : '#757575'}
        />
        {activeTab === 'MyBlogPage' && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#2196F3',
  },
});

export default TabBar;