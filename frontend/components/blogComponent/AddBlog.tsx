import React, { useState, useEffect, useRef } from 'react';
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
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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
  const [slideAnim] = useState(new Animated.Value(width));
  const scrollViewRef = useRef<ScrollView>(null);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const uploadImage = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `blog_images/${filename}`);
    
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    if (
      !title || !introduction || !sciName || !physicalCharacteristics || !habitatDistribution ||
      !behavior || !importanceEcosystem || !coverPhoto || images.length === 0 
    ) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      const coverPhotoUrl = await uploadImage(coverPhoto.uri);
      const imageUrls = await Promise.all(images.map(image => uploadImage(image.uri)));

      const newBlog = {
        blog_title: title,
        blog_category: introduction,
        blog_sciname: sciName,
        blog_physicalCharacteristics: physicalCharacteristics,
        blog_habitatDistribution: habitatDistribution,
        blog_behavior: behavior,
        blog_importanceEcosystem: importanceEcosystem,
        blog_coverPhoto: coverPhotoUrl,
        blog_images: imageUrls,
      };

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

  const renderInputField = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    multiline = false
  ) => (
    <Animated.View style={[styles.inputContainer, { transform: [{ translateX: slideAnim }] }]}>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a0aec0"
        multiline={multiline}
      />
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#6C9EE5" />
          </TouchableOpacity>
          <Text style={styles.title}>Create New Blog</Text>
        </View>

        {renderInputField("Title", title, setTitle)}
        {renderInputField("Introduction", introduction, setIntroduction)}
        {renderInputField("Scientific Name", sciName, setSciName)}
        {renderInputField("Physical Characteristics", physicalCharacteristics, setPhysicalCharacteristics, true)}
        {renderInputField("Habitat & Distribution", habitatDistribution, setHabitatDistribution, true)}
        {renderInputField("Behavior", behavior, setBehavior, true)}
        {renderInputField("Importance in the Ecosystem", importanceEcosystem, setImportanceEcosystem, true)}

        <Animated.View style={[styles.section, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.subtitle}>Cover Photo</Text>
          {coverPhoto && (
            <Animated.Image
              source={{ uri: coverPhoto.uri }}
              style={[styles.image, { opacity: fadeAnim }]}
            />
          )}
          <TouchableOpacity style={styles.addButton} onPress={() => pickImage(setCoverPhoto)}>
            <Text style={styles.addButtonText}>Select Cover Photo</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.section, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.subtitle}>Add Images (up to 9)</Text>
          <View style={styles.imageGrid}>
            {images.map((image, index) => (
              <Animated.Image
                key={index}
                source={{ uri: image.uri }}
                style={[styles.gridImage, { opacity: fadeAnim }]}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
            <Text style={styles.addButtonText}>+ Add Image</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C9EE5',
    marginLeft: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#2d3748',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  gridImage: {
    width: (width - 60) / 3,
    height: (width - 60) / 3,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#6C9EE5',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#6C9EE5',
  },
  buttonText: {
    color: '#6C9EE5',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#ffffff',
  },
});

export default AddBlog;