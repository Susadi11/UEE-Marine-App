import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  EditEvent: { eventData: any };  // Adjust 'any' to the correct type of your event data
};

type EditEventRouteProp = RouteProp<RootStackParamList, 'EditEvent'>;

const EditEvent: React.FC = () => {
  const route = useRoute<EditEventRouteProp>();
    const { eventData } = route.params;  // Get the event data from route params
    const navigation = useNavigation();
    const firestore = getFirestore();

    const [title, setTitle] = useState(eventData.title);
    const [description, setDescription] = useState(eventData.description);
    const [eventDate, setEventDate] = useState(new Date(eventData.date));
    const [eventTime, setEventTime] = useState(new Date(eventData.time));
    
    const [location, setLocation] = useState({
        latitude: eventData.latitude,
        longitude: eventData.longitude,
    });
    const [imageUri, setImageUri] = useState<string | null>(eventData.imageUrl);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        setEventDate(selectedDate || eventDate);
    };

    const handleTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        setEventTime(selectedTime || eventTime);
    };
    
    
    const formatTime = (time: Date) => {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };
    

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'You need to allow permission to access the gallery.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        } else {
            console.log('Image picking was canceled');
        }
    };

    const uploadImage = async () => {
        if (imageUri && imageUri !== eventData.imageUrl) {
            try {
                const response = await fetch(imageUri);
                const blob = await response.blob();
                const storageRef = ref(storage, `events/${Date.now()}`);
                await uploadBytes(storageRef, blob);
                return await getDownloadURL(storageRef);
            } catch (error) {
                console.error('Error uploading image:', error);
                Alert.alert('Error', 'Failed to upload image');
            }
        }
        return eventData.imageUrl;
    };

    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            const imageUrl = await uploadImage();
            const eventRef = doc(firestore, 'events', eventData.id);

            await updateDoc(eventRef, {
                title,
                description,
                date: eventDate.toISOString(),
                time: eventTime.toISOString(),
                latitude: location.latitude,
                longitude: location.longitude,
                imageUrl,
            });

            Alert.alert('Success', 'Event updated successfully');
            navigation.goBack(); // Navigate back to MyEvents
        } catch (error) {
            console.error('Error updating event:', error);
            Alert.alert('Error', 'Failed to update the event');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Edit Event</Text>
            <Input label="Title" value={title} onChangeText={setTitle} />
            <Input label="Description" value={description} onChangeText={setDescription} multiline />
  
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.picker}>
                    <Text style={styles.pickerText}>Select Date: {eventDate.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker value={eventDate} mode="date" display="default" onChange={handleDateChange} />
                )}

                {/* Time Picker */}
                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.picker}>
                <Text style={styles.pickerText}>Select Time: {formatTime(eventTime)}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker value={eventDate} mode="time" display="default" onChange={handleDateChange} />
                )}

            <Text style={styles.label}>Location</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={(e) => setLocation(e.nativeEvent.coordinate)}
            >
                <Marker coordinate={location} />
            </MapView>
            <TouchableOpacity onPress={handleImagePick}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                ) : (
                    <Text>Select an image</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        fontFamily:'inter',
        paddingLeft: 130,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily:'inter'
    },
    picker: {
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 8,
    },
    pickerText: {
        color: '#ccc',
         fontFamily:'inter'
    },
    map: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#6C9EE5',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
         fontFamily:'inter'
    },
});

export default EditEvent;
