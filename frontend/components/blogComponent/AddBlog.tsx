import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomMessage from '../CustomMessage';

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
  const flatListRef = useRef<FlatList>(null);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  const [showMessage, setShowMessage] = useState(false);

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

      setShowMessage(true);

      // Clear the form after successful save
      setTitle('');
      setIntroduction('');
      setSciName('');
      setPhysicalCharacteristics('');
      setHabitatDistribution('');
      setBehavior('');
      setImportanceEcosystem('');
      setCoverPhoto(null);
      setImages([]);

      // Close the form after a short delay
      setTimeout(() => {
        onClose();
      }, 3000);
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

  const renderItem = ({ item }: { item: any }) => (
    <Animated.Image
      source={{ uri: item.uri }}
      style={[styles.gridImage, { opacity: fadeAnim }]}
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={[{ key: 'content' }]}
        renderItem={() => (
          <>
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
              <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                scrollEnabled={false}
              />
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
          </>
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      />

      <CustomMessage 
        message="Blog saved successfully!" 
        type="success" 
        visible={showMessage} 
        onHide={() => setShowMessage(false)} 
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3748',
    marginLeft: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f7fafc',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
    color: '#2d3748',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  gridImage: {
    width: '30%',
    height: 100,
    margin: '1.5%',
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#6C9EE5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#e2e8f0',
  },
  buttonText: {
    color: '#2d3748',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6C9EE5',
  },
  saveButtonText: {
    color: '#ffffff',
  },
});

export default AddBlog;