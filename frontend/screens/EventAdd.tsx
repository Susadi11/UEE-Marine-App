import React, { useState } from 'react';
import {
    View, Text, ScrollView, StyleSheet, Alert,
    TouchableOpacity, Image, TextInput, KeyboardAvoidingView,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

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
        }
    };

    const uploadImage = async () => {
        if (imageUri) {
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
        return null;
    };

    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }

            const imageUrl = await uploadImage();
            const eventData = {
                title,
                description,
                date :eventDate.toLocaleDateString(),
                time: eventTime.toLocaleTimeString(),
                location,
                imageUrl,
                userId: user.uid,
                createdAt: new Date(),
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
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.heading}>Publish a New Event</Text>

                {/* Title Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter event title"
                    value={title}
                    cursorColor={'#007BFF'}
                    placeholderTextColor={'#ccc'}
                    onChangeText={setTitle}
                />

                {/* Description Input */}
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter event description"
                    placeholderTextColor={'#ccc'}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                {/* Date Picker */}
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.picker}>
                    <Text style={styles.pickerText}>Select Date: {eventDate.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker value={eventDate} mode="date" display="default" onChange={handleDateChange} />
                )}

                {/* Time Picker */}
                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.picker}>
                    <Text style={styles.pickerText}>Select Time: {eventTime.toLocaleTimeString()}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker value={eventTime} mode="time" display="default" onChange={handleTimeChange} />
                )}

                {/* Map View */}
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

                {/* Image Picker */}
                <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
                    {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : <Text>+ Add Cover Photo</Text>}
                </TouchableOpacity>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Publish Event</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    form: {
        padding: 16,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#f7fafc',
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontSize: 16,
        color: '#2d3748',
        marginTop: 8,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
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
        backgroundColor: '#f3f3f3',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    submitButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: '#6C9EE5',
    },
    submitButtonText: {
        color: '#ffffff',
    },
});

export default EventPublish;
