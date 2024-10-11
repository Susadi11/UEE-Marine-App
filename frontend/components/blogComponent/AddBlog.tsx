import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from 'react-native';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomMessage from '../CustomMessage';
import { getAuth } from 'firebase/auth';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

const { width } = Dimensions.get('window');

// Define the type for your route params
type RootStackParamList = {
  BlogDetail: { blogData: any };
  AddBlog: { blogData?: BlogData; isEditing: boolean };
};

// Define the type for your blog data
type BlogData = {
  id: string;
  blog_title: string;
  blog_category: string;
  blog_sciname: string;
  blog_physicalCharacteristics: string;
  blog_habitatDistribution: string;
  blog_behavior: string;
  blog_importanceEcosystem: string;
  blog_coverPhoto: string;
  blog_images: string[];
};

type AddBlogScreenRouteProp = RouteProp<RootStackParamList, 'AddBlog'>;
type AddBlogScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddBlog'>;


const AddBlog: React.FC = () => {
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
  const [showMessage, setShowMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [blogId, setBlogId] = useState<string | null>(null);

  const navigation = useNavigation<AddBlogScreenNavigationProp>();
  const route = useRoute<AddBlogScreenRouteProp>();

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

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

    // Check if we're in edit mode and pre-fill the form
    if (route.params?.blogData) {
      const blogData = route.params.blogData;
      setIsEditing(true);
      setBlogId(blogData.id);
      setTitle(blogData.blog_title);
      setIntroduction(blogData.blog_category);
      setSciName(blogData.blog_sciname);
      setPhysicalCharacteristics(blogData.blog_physicalCharacteristics);
      setHabitatDistribution(blogData.blog_habitatDistribution);
      setBehavior(blogData.blog_behavior);
      setImportanceEcosystem(blogData.blog_importanceEcosystem);
      setCoverPhoto({ uri: blogData.blog_coverPhoto });
      setImages(blogData.blog_images.map((uri: string) => ({ uri })));
    }
  }, [route.params]);

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
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      let coverPhotoUrl = coverPhoto.uri;
      if (!coverPhotoUrl.startsWith('http')) {
        coverPhotoUrl = await uploadImage(coverPhoto.uri);
      }

      const imageUrls = await Promise.all(images.map(image => 
        image.uri.startsWith('http') ? image.uri : uploadImage(image.uri)
      ));

      const blogData = {
        blog_title: title,
        blog_category: introduction,
        blog_sciname: sciName,
        blog_physicalCharacteristics: physicalCharacteristics,
        blog_habitatDistribution: habitatDistribution,
        blog_behavior: behavior,
        blog_importanceEcosystem: importanceEcosystem,
        blog_coverPhoto: coverPhotoUrl,
        blog_images: imageUrls,
        userId: user.uid,
        updatedAt: new Date(),
      };

      if (isEditing && blogId) {
        await updateDoc(doc(firestore, 'blogs', blogId), blogData);
        console.log('Document updated with ID: ', blogId);
      } else {
        const docRef = await addDoc(collection(firestore, 'blogs'), {
          ...blogData,
          createdAt: new Date(),
        });
        console.log('Document written with ID: ', docRef.id);
      }

      setShowMessage(true);

      // Navigate back after a short delay
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    } catch (error: unknown) {
      console.error('Error saving document: ', error);
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
        allowsEditing: false,
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
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    multiline = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        selectionColor='black'
      />
    </View>
  );

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={28} color="#6C9EE5" />
            </TouchableOpacity>
            <Text style={styles.title}>{isEditing ? 'Edit Blog' : 'Create New Blog'}</Text>
          </View>

          {renderInputField("Title", "Enter blog title", title, setTitle)}
          {renderInputField("Introduction", "Enter introduction", introduction, setIntroduction)}
          {renderInputField("Scientific Name", "Enter scientific name", sciName, setSciName)}
          {renderInputField("Physical Characteristics", "Enter physical characteristics", physicalCharacteristics, setPhysicalCharacteristics, true)}
          {renderInputField("Habitat & Distribution", "Enter habitat and distribution", habitatDistribution, setHabitatDistribution, true)}
          {renderInputField("Behavior", "Enter behavior", behavior, setBehavior, true)}
          {renderInputField("Importance in the Ecosystem", "Enter importance in the ecosystem", importanceEcosystem, setImportanceEcosystem, true)}

          <Text style={styles.label}>Cover Photo</Text>
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={() => pickImage(setCoverPhoto)}
            >
              {coverPhoto ? (
                <Image source={{ uri: coverPhoto.uri }} style={styles.coverImage} resizeMode="contain" />
              ) : (
                <>
                  <MaterialCommunityIcons name="image-outline" size={60} color="grey" />
                  <Text style={styles.imagePickerButtonText}>Add Cover Photo</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Images</Text>
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={handleAddImage}
            >
              <MaterialCommunityIcons name="image-outline" size={60} color="grey" />
              <Text style={styles.imagePickerButtonText}>
                {images.length === 0 ? "Add Images" : "Add More Images"}
              </Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: image.uri }} style={styles.image} resizeMode="contain" />
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.addBlogButton]}
              onPress={handleSave}
            >
              <Text style={styles.addBlogButtonText}>{isEditing ? 'Save Changes' : 'Add Blog'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CustomMessage 
        message={isEditing ? "Blog updated successfully!" : "Blog saved successfully!"} 
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
    backgroundColor: '#F9FAFB',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
    fontFamily: 'Inter_700Bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontFamily: 'Inter_600SemiBold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePickerContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
    borderColor: 'grey',
    marginBottom: 15,
  },
  imagePickerButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerButtonText: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Inter_500Medium',
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'silver',
    borderRadius: 100,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 12,
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
  addBlogButton: {
    backgroundColor: '#6C9EE5',
  },
  addBlogButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
  },
});

export default AddBlog;