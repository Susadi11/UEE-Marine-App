import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabBar from './TabBar';

// Use TabName type from TabBar to ensure type consistency
type TabName = 'AllBlogs' | 'TrendingPage' | 'MyBlogPage';

type SearchProps = {
  activeTab: TabName;
  onTabPress: (tabName: TabName) => void;
  onAddPress: () => void;
};

const Search: React.FC<SearchProps> = ({ activeTab, onTabPress, onAddPress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Animated.View
          style={[
            styles.searchBoxContainer,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '85%'],
              }),
            },
          ]}
        >
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBox}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </Animated.View>
        <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <TabBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft:20,
    paddingRight: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBoxContainer: {
    flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,

  },
  searchIcon: {
    marginRight: 8,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    marginLeft: 8,
  },
});

export default Search;
