import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
console.log('ImagePicker:', ImagePicker); // Add this line for debugging

const AddBlog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [sciName, setSciName] = useState('');
  const [para1, setPara1] = useState('');
  const [para2, setPara2] = useState('');
  const [para3, setPara3] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [hashtags, setHashtags] = useState('');

  const firestore = getFirestore(app);

  const handleSave = async () => {
    if (!title || !category || !sciName || !para1 || !para2 || !para3 || !coverPhoto || images.length === 0 || !hashtags) {
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
      blog_coverPhoto: coverPhoto?.uri,
      blog_images: images.map(image => image.uri),
      blog_hashtags: hashtags.split(',').map(tag => tag.trim()),
    };

    try {
      const docRef = await addDoc(collection(firestore, 'blogs'), newBlog);
      console.log('Document written with ID: ', docRef.id);
      Alert.alert('Blog saved successfully');
      onClose();
    } catch (error: unknown) {
      console.error('Error adding document: ', error);
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('An unknown error occurred');
      }
    }
  };

  
const pickImage = async (setImage: React.Dispatch<any>) => {
  try {
    // Request permission first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to use this feature.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  } catch (error: unknown) {
    console.error('Error picking image: ', error);
    if (error instanceof Error) {
      Alert.alert('Error picking image', error.message);
    } else {
      Alert.alert('An unknown error occurred.');
    }
  }
};

  const handleAddImage = async () => {
    if (images.length < 9) {
      await pickImage((image) => setImages([...images, image]));
    } else {
      Alert.alert('You can add up to 9 images');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        placeholder="Paragraph 1"
        value={para1}
        onChangeText={setPara1}
        multiline={true}
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Paragraph 2"
        value={para2}
        onChangeText={setPara2}
        multiline={true}
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Paragraph 3"
        value={para3}
        onChangeText={setPara3}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={styles.subtitle}>Cover Photo</Text>
      {coverPhoto && <Image source={{ uri: coverPhoto.uri }} style={styles.image} />}
      <TouchableOpacity style={styles.addButton} onPress={() => pickImage(setCoverPhoto)}>
        <Text style={styles.addButtonText}>Select Cover Photo</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Add Images (up to 9)</Text>
      {images.map((image, index) => (
        <Image key={index} source={{ uri: image.uri }} style={styles.image} />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
        <Text style={styles.addButtonText}>+ Add Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Hashtags (comma separated)"
        value={hashtags}
        onChangeText={setHashtags}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#333',
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
