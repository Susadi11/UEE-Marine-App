import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, Platform, Image } from 'react-native';
import { Input } from 'react-native-elements';
 
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig'; 

type RootStackParamList = {
  EventPage: undefined;
};

type EventNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventPage'>;

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: { latitude: number; longitude: number };
  coverPhoto?: string | null;
}

const EventPublish: React.FC = () => {
  const navigation = useNavigation<EventNavigationProp>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventTime, setEventTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [location, setLocation] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
  });
  const [imageUri, setImageUri] = useState<string | null>(null);

  const firestore = getFirestore(app);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || eventTime;
    setShowTimePicker(false);
    setEventTime(currentTime);
  };

  const handleImagePick = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert('Permission required', 'You need to allow permission to access the gallery.');
        return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Reduce the quality
    });
    

    if (!result.canceled) {
        setImageUri(result.assets[0].uri);
    } else {
        console.log('Image picking was canceled');
    }
};

const uploadImage = async () => {
    if (imageUri) {
        try {
            const response = await fetch(imageUri);

            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
            const blob = await response.blob();
            const storageRef = ref(storage, `product_images/${Date.now()}`);
            console.log('Uploading to:', storageRef.fullPath); // Debugging upload path

            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            console.log('Download URL:', downloadURL); // Log the download URL

            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error', 'Failed to upload image');
        }
    } else {
        console.log('No imageUri provided'); // Debugging missing imageUri
    }
    return null;
};


  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const eventData = {
      title,
      description,
      date: eventDate.toISOString(),
      time: eventTime.toLocaleTimeString(),
      location,
      const imageUrl = await uploadImage(),
    };

    try {
      const docRef = await addDoc(collection(firestore, 'events'), eventData);
      Alert.alert('Success', 'Event published successfully');
      
      // Reset the form fields after successful submission
      setTitle('');
      setDescription('');
      setEventDate(new Date());
      setEventTime(new Date());
      setLocation({
        latitude: 6.9271,
        longitude: 79.8612,
      });
      setImageUri(null);

      navigation.goBack();
    } catch (error: unknown) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'An unknown error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Publish Event</Text>

      <Input
        placeholder="Enter event title"
        value={title}
        onChangeText={setTitle}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainerStyle}
      />

      <Input
        placeholder="Enter event description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainerStyle}
      />

      <Text style={styles.label}>Select Event Date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Input
          placeholder="Tap to select date"
          value={eventDate.toDateString()}
          editable={false}
          inputStyle={styles.dateInput}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={eventDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Select Event Time:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Input
          placeholder="Tap to select time"
          value={eventTime.toLocaleTimeString()}
          editable={false}
          inputStyle={styles.dateInput}
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={eventTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Text style={styles.label}>Select Location:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.9271,
          longitude: 79.8612,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => setLocation(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={location} />
      </MapView>

      <Text style={styles.label}>Select Cover Photo:</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
                    {imageUri ? (
                        console.log('imageUri----', imageUri),
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <Text style={styles.imagePickerText}>Select Product Image</Text>
                    )}
                </TouchableOpacity>
      

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Publish Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#007BFF',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
    color: '#1f2937',
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: '#1f2937',
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  dateInput: {
    fontSize: 16,
    color: '#1f2937',
  },
  map: {
    width: '100%',
    height: 300,
    marginVertical: 12,
    borderRadius: 10,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 10,
  },
  smallButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 16,
    marginBottom:100,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#f0f0f0',
},
imagePickerText: {
    color: '#666',
},
image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
},
});

export default EventPublish;
function uploadBytes(storageRef: any, blob: Blob) {
  throw new Error('Function not implemented.');
}

