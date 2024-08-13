import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const AddBlog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [sciName, setSciName] = useState('');
  const [para1, setPara1] = useState('');
  const [para2, setPara2] = useState('');
  const [para3, setPara3] = useState('');

  const handleSave = async () => {
    if (!title || !category || !sciName || !para1 || !para2 || !para3) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newBlog = {
      blog_title: title,
      blog_category: category,
      blog_sciname: sciName,
      blog_para1: para1,
      blog_para2: para2,
      blog_para3: para3,
    };

    try {
        const response = await fetch('http://192.168.1.87:5555/blog', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBlog),
          });

      if (response.ok) {
        Alert.alert('Blog saved successfully');
        onClose();
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('An unknown error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Blog Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Scientific Name"
        value={sciName}
        onChangeText={setSciName}
      />
      <TextInput
        style={styles.input}
        placeholder="para1"
        value={para1}
        onChangeText={setPara1}
        multiline={true}
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="para2"
        value={para2}
        onChangeText={setPara2}
        multiline={true}
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="para3"
        value={para3}
        onChangeText={setPara3}
        multiline={true}
        numberOfLines={4}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddBlog;
