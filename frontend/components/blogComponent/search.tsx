import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortType, setSortType] = React.useState('A');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={sortType}
        style={styles.sortBox}
        onValueChange={(itemValue) => setSortType(itemValue)}
      >
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="C" value="C" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
  },
  sortBox: {
    height: 40,
    width: 100,
    marginLeft: 10,
  },
});

export default Search;
