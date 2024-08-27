import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabBar from './TabBar';

type SearchProps = {
  activeTab: string;
  onTabPress: (tabName: string) => void;
  onAddPress: () => void;
};

const Search: React.FC<SearchProps> = ({ activeTab, onTabPress, onAddPress }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchBoxContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBox}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity onPress={onAddPress}>
          <Icon name="add" size={25} color="#000" style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <TabBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
  },
  addIcon: {
    marginLeft: 10,
  },
});

export default Search;