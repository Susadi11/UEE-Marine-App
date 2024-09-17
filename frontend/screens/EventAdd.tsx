import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EventPublish: React.FC = () => {
    const navigation = useNavigation();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState(new Date());
    const [eventTime, setEventTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [location, setLocation] = useState({ latitude: 6.9271, longitude: 79.8612 });
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        setEventDate(selectedDate || eventDate);
    };

    const handleTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        setEventTime(selectedTime || eventTime);
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
        if (imageUri) {
            try {
                const response = await fetch(imageUri);
                if (!response.ok) throw new Error('Failed to fetch image');
                const blob = await response.blob();
                const storageRef = ref(storage, `events/${Date.now()}`);
                await uploadBytes(storageRef, blob);
                return await getDownloadURL(storageRef);
            } catch (error) {
                console.error('Error uploading image:', error);
                Alert.alert('Error', 'Failed to upload image');
            }
        }
        return null;
    };

    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            const imageUrl = await uploadImage();
            const eventData = {
                title,
                description,
                date: eventDate.toISOString(),
                time: eventTime.toLocaleTimeString(),
                location,
                imageUrl
            };
            await addDoc(collection(db, 'events'), eventData);
            Alert.alert('Success', 'Event published successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding document: ', error);
            Alert.alert('Error', 'An error occurred while publishing the event');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Publish Event</Text>
            <Input placeholder="Enter event title" value={title} onChangeText={setTitle} />
            <Input placeholder="Enter event description" value={description} onChangeText={setDescription} multiline numberOfLines={4} />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Input placeholder="Tap to select date" value={eventDate.toDateString()} editable={false} />
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker value={eventDate} mode="date" display="default" onChange={handleDateChange} />
            )}

            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Input placeholder="Tap to select time" value={eventTime.toLocaleTimeString()} editable={false} />
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker value={eventTime} mode="time" display="default" onChange={handleTimeChange} />
            )}

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => setLocation(e.nativeEvent.coordinate)}
            >
                <Marker coordinate={location} />
            </MapView>

            <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
                {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : <Text>Select Cover Photo</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Publish Event</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f3f4f6',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#007BFF',
    },
    map: {
        width: '100%',
        height: 300,
        marginVertical: 12,
    },
    imagePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 12,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 16,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default EventPublish;
