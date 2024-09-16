import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddBlog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [sciName, setSciName] = useState('');
  const [physicalCharacteristics, setPhysicalCharacteristics] = useState('');
  const [habitatDistribution, setHabitatDistribution] = useState('');
  const [behavior, setBehavior] = useState('');
  const [importanceEcosystem, setImportanceEcosystem] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
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
    if (
      !title || !introduction || !sciName || !physicalCharacteristics || !habitatDistribution ||
     !behavior || !importanceEcosystem || !coverPhoto || images.length === 0 
    ) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newBlog = {
      blog_title: title,
      blog_category: introduction,
      blog_sciname: sciName,
      blog_physicalCharacteristics: physicalCharacteristics,
      blog_habitatDistribution: habitatDistribution,
      blog_behavior: behavior,
      blog_importanceEcosystem: importanceEcosystem,
      blog_coverPhoto: coverPhoto?.uri,
      blog_images: images.map(image => image.uri),
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
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#2d3748" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Blog</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#a0aec0"
      />
      <TextInput
        style={styles.input}
        placeholder="Introduction"
        value={introduction}
        onChangeText={setIntroduction}
        placeholderTextColor="#a0aec0"
      />
      <TextInput
        style={styles.input}
        placeholder="Scientific Name"
        value={sciName}
        onChangeText={setSciName}
        placeholderTextColor="#a0aec0"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Physical Characteristics"
        value={physicalCharacteristics}
        onChangeText={setPhysicalCharacteristics}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#a0aec0"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Habitat & Distribution"
        value={habitatDistribution}
        onChangeText={setHabitatDistribution}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#a0aec0"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Behavior"
        value={behavior}
        onChangeText={setBehavior}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#a0aec0"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Importance in the Ecosystem"
        value={importanceEcosystem}
        onChangeText={setImportanceEcosystem}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#a0aec0"
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
      <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff', // bg-gray-100
    flex: 1, // Make sure the ScrollView takes up the full screen
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748', // text-gray-800
    marginLeft: 20,
  },
  input: {
    borderColor: '#4a5568', // border-gray-300
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#2d3748', // text-gray-800
  },
  textArea: {
    height: Platform.OS === 'ios' ? 100 : undefined, // adjust height for iOS
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2d3748', // text-gray-800
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  gridImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#6C9EE5', // bg-gray-600
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff', // text-white
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#e2e8f0', // bg-gray-300
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#6C9EE5', // bg-gray-800
    marginLeft: 10,
  },
  buttonText: {
    color: '#2d3748', // text-gray-800
    textAlign: 'center',
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#fff', // text-white
  },
});

export default AddBlog;
