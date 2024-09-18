import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabName = 'AllBlogs' | 'TrendingPage' | 'MyBlogPage';

type TabBarProps = {
  activeTab: TabName;
  onTabPress: (tabName: TabName) => void;
};

type AnimatedValues = {
  [K in TabName]: Animated.Value;
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
  const [animatedValues] = React.useState<AnimatedValues>({
    AllBlogs: new Animated.Value(activeTab === 'AllBlogs' ? 1 : 0),
    TrendingPage: new Animated.Value(activeTab === 'TrendingPage' ? 1 : 0),
    MyBlogPage: new Animated.Value(activeTab === 'MyBlogPage' ? 1 : 0),
  });

  React.useEffect(() => {
    Object.keys(animatedValues).forEach((key) => {
      Animated.spring(animatedValues[key as TabName], {
        toValue: activeTab === key ? 1 : 0,
        useNativeDriver: false,
      }).start();
    });
  }, [activeTab, animatedValues]);

  const renderTab = (name: TabName, iconName: keyof typeof Ionicons.glyphMap) => {
    const isActive = activeTab === name;
    const animatedStyle = {
      transform: [
        {
          scale: animatedValues[name].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
          }),
        },
      ],
    };

    return (
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onTabPress(name)}
      >
        <Animated.View style={animatedStyle}>
          <Ionicons
            name={iconName}
            size={24}
            color={isActive ? '#6C9EE5' : '#999'}
          />
        </Animated.View>
        {isActive && <View style={styles.activeBar} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tabBar}>
      {renderTab('AllBlogs', 'list')}
      {renderTab('TrendingPage', 'trending-up')}
      {renderTab('MyBlogPage', 'person-outline')}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  activeBar: {
    position: 'absolute',
    bottom: 0,
    width: '70%',
    height: 4, // Height of the active bar
    backgroundColor: '#6C9EE5',
  },
});

export default TabBar;
