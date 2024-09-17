import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const ExploreEvents = ({ navigation }: any) => {
    const [events, setEvents] = useState<{ id: string; title: string; date: string; time: string;  location: { latitude: number; longitude: number; }; imageUrl: string; description: string; }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const firestore = getFirestore(app);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'events'));
                const eventList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as { id: string; title: string;description: string; date: string; time: string; location: { latitude: number; longitude: number; }; imageUrl: string; }[];
                setEvents(eventList);
            } catch (error) {
                console.error('Error fetching events: ', error);
                Alert.alert('Error', 'Unable to fetch events');
            }
        };

        fetchEvents();
    }, []);

    const handleAttendEvent = (event: any) => {
        // Navigate to AttendEvent screen with event data as params
        navigation.navigate('EventDetails', { event });
    };

    const handleDeleteEvent = async (eventId: string) => {
        Alert.alert(
            'Delete Event',
            'Are you sure you want to delete this event?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(firestore, 'events', eventId));
                            setEvents(events.filter(event => event.id !== eventId)); // Remove the deleted event from state
                            Alert.alert('Success', 'Event deleted successfully');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete the event');
                        }
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const filteredEvents = events.filter(event =>
        event.title?.toLowerCase().includes(searchQuery.toLowerCase())
        
    );

    
    
    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://t4.ftcdn.net/jpg/05/79/90/33/360_F_579903359_dPN7YwyB8l5lUUCrP3nj0kvPcFe90Lbg.jpg' }} // Replace with a relevant image URL
            >
                <View style={styles.overlay}>
                    <Text style={styles.title}>Upcoming Events</Text>
                    <Text style={styles.subtitle}>Explore events happening near you</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for event"
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={text => setSearchQuery(text)}
                        />
                    </View>
                </View>
            </ImageBackground>

            {filteredEvents.map(event => (
                <View key={event.id} style={styles.eventCard}>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => { /* Handle image press */ }}>
                        {event.imageUrl && <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />}
                    </TouchableOpacity>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.eventName}>{event.title}</Text>
                        <Text style={styles.eventDate}>Date: {event.date}</Text>
                       
                        <TouchableOpacity style={styles.attendButton} onPress={() => handleAttendEvent(event)}>
                            <Icon name="eye" size={20} color="#fff" />
                            <Text style={styles.attendButtonText}>View Post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEvent(event.id)}>
                            <Icon name="trash" size={20} color="#fff" />
                            <Text style={styles.deleteButtonText}>Delete Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: 200,
    },
    overlay: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 52,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 33,
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        fontSize: 16,
        color: '#000',
    },
    eventCard: {
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginHorizontal: 16,
        marginTop: 10,
    },
    imageContainer: {
        position: 'relative',
        height: 300,
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
    },
    eventImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 25,
    },
    detailsContainer: {
        padding: 15,
    },
    eventName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    eventDate: {
        fontSize: 16,
        color: '#250071',
        marginVertical: 5,
        fontWeight:'semibold'
    },
    eventTime: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
       
    },
    eventLocation: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    eventDescription: {
        fontSize: 14,
        color: '#224671',
        marginVertical: 10,
    },
    attendButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    attendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    deleteButton: {
        backgroundColor: '#e66666',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default ExploreEvents;
