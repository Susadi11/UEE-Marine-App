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

const AddBlog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [sciName, setSciName] = useState('');
  const [physicalCharacteristics, setPhysicalCharacteristics] = useState('');
  const [habitatDistribution, setHabitatDistribution] = useState('');
  const [dietFeedingHabits, setDietFeedingHabits] = useState('');
  const [behavior, setBehavior] = useState('');
  const [importanceEcosystem, setImportanceEcosystem] = useState('');
  const [humanInteractionImpact, setHumanInteractionImpact] = useState('');
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
    if (
      !title || !introduction || !sciName || !physicalCharacteristics || !habitatDistribution ||
      !dietFeedingHabits || !behavior || !importanceEcosystem || !humanInteractionImpact || 
      !coverPhoto || images.length === 0 || !hashtags
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
      blog_dietFeedingHabits: dietFeedingHabits,
      blog_behavior: behavior,
      blog_importanceEcosystem: importanceEcosystem,
      blog_humanInteractionImpact: humanInteractionImpact,
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
        placeholder="Diet & Feeding Habits"
        value={dietFeedingHabits}
        onChangeText={setDietFeedingHabits}
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
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Human Interaction & Impact"
        value={humanInteractionImpact}
        onChangeText={setHumanInteractionImpact}
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
      <TextInput
        style={styles.input}
        placeholder="Hashtags (comma separated)"
        value={hashtags}
        onChangeText={setHashtags}
        placeholderTextColor="#a0aec0"
      />
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
    backgroundColor: '#f7fafc', // bg-gray-100
    flex: 1, // Make sure the ScrollView takes up the full screen
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3748', // text-gray-800
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2d3748', // text-gray-800
  },
  input: {
    borderColor: '#e2e8f0', // border-gray-300
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#2d3748', // text-gray-800
    backgroundColor: '#ffffff', // bg-white
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#4299e1', // bg-blue-500
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff', // text-white
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#edf2f7', // bg-gray-200
  },
  saveButton: {
    backgroundColor: '#4299e1', // bg-blue-500
  },
  buttonText: {
    color: '#2d3748', // text-gray-800
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#ffffff', // text-white
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default AddBlog;
