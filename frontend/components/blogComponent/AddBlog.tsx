import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, Animated } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

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
  const [fadeAnim] = useState(new Animated.Value(0));

  const firestore = getFirestore(app);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

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
    <Animated.ScrollView 
      contentContainerStyle={styles.container}
      style={[styles.scrollView, { opacity: fadeAnim }]}
    >
      <Text style={styles.title}>Add a New Blog Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#a0a0a0"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        placeholderTextColor="#a0a0a0"
      />
      <TextInput
        style={styles.input}
        placeholder="Scientific Name"
        value={sciName}
        onChangeText={setSciName}
        placeholderTextColor="#a0a0a0"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Paragraph 1"
        value={para1}
        onChangeText={setPara1}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#a0a0a0"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Paragraph 2"
        value={para2}
        onChangeText={setPara2}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#a0a0a0"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Paragraph 3"
        value={para3}
        onChangeText={setPara3}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#a0a0a0"
      />
      <Text style={styles.subtitle}>Cover Photo</Text>
      {coverPhoto && <Image source={{ uri: coverPhoto.uri }} style={styles.image} />}
      <TouchableOpacity style={styles.addButton} onPress={() => pickImage(setCoverPhoto)}>
        <Text style={styles.addButtonText}>Select Cover Photo</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Add Images (up to 9)</Text>
      <View style={styles.imageGrid}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.gridImage} />
        ))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
        <Text style={styles.addButtonText}>+ Add Image</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Hashtags (comma separated)"
        value={hashtags}
        onChangeText={setHashtags}
        placeholderTextColor="#a0a0a0"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
   
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000071',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 113, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000071',
  },
  input: {
    borderColor: '#000071',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    color: '#000071',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridImage: {
    width: '32%',
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#000071',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#000071',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#0080ff',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AddBlog;