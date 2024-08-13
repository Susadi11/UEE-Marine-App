import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddBlog from '../../components/blogComponent/AddBlog'; // Adjust the path based on the actual location

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortType, setSortType] = React.useState('');
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBox}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.circleButton} onPress={toggleModal}>
            <Icon name="add" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Add</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.circleButton}>
            <Icon name="trending-up" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Trending</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.circleButton}>
            <Icon name="rss-feed" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>My Blogs</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sortType}
            style={styles.sortBox}
            onValueChange={(itemValue) => setSortType(itemValue)}
          >
            <Picker.Item label="Sort" value="" />
            <Picker.Item label="A" value="A" />
            <Picker.Item label="B" value="B" />
            <Picker.Item label="C" value="C" />
          </Picker>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AddBlog onClose={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  searchContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  buttonWrapper: {
    alignItems: 'center',
    width: '18%', // Reduced to make space for the wider picker
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    width: '42%', // Increased width for the picker
  },
  sortBox: {
    height: 40,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
});

export default Search;
