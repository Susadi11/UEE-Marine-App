import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import Svg, { Path } from 'react-native-svg';

const AllEvents = ({ navigation }: any) => {
    const [events, setEvents] = useState<{ id: string; title: string; date: string; time: string;  location: { latitude: number; longitude: number; }; imageUrl: string; description: string; }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const firestore = getFirestore(app);
    const [activeTab, setActiveTab] = useState('All Events');

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
          
              
                    <Text style={styles.title}>Upcoming Events</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for event"
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={text => setSearchQuery(text)}
                        />
                    </View>
                    <View style={styles.container}>
            {/* Navigation Tabs */}
            <View style={styles.navButtons}>
                {['All Events', 'My Events'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.navButton, activeTab === tab && styles.activeNavButton]}
                        onPress={() => {
                            setActiveTab(tab);
                            if (tab === 'My Events') {
                                navigation.navigate('MyEvents');
                            }
                        }}
                    >
                        <Text style={[styles.navButtonText, activeTab === tab && styles.activeNavButtonText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            </View>
               

            {filteredEvents.map(event => (
                <View key={event.id} style={styles.eventCard}>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => { /* Handle image press */ }}>
                        {event.imageUrl && <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />}
                    </TouchableOpacity>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.eventName}>{event.title}</Text>
                        <Text style={styles.eventDate}>{event.description}</Text>
                        
                        <TouchableOpacity style={styles.button}onPress={() => handleAttendEvent(event)}>
                        <Text style={styles.text}>View More</Text>
                                <Svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={styles.icon}
                                >
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                                </Svg>
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
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    navButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    activeNavButton: {
        backgroundColor: '#6C9EE5',
    },
    navButtonText: {
        fontSize: 16,
        
        color: '#666',
    },
    activeNavButtonText: {
        color: '#000',
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
        color: '#333',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    description:{
        color: '#28116b',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    subtitle: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '85%',
        maxWidth: 400,
        alignItems: 'center',
        marginLeft: 30,
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
        fontSize: 12,
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
    heroButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginVertical: 10,
        marginHorizontal: 130,
        flexDirection: 'row',
     
        
      },
       
      heroButtonText: {
        color: '#666',
        fontSize: 20,
        fontWeight: 'bold',
        
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6C9EE5', // Equivalent to indigo-600
        paddingVertical: 8, // Equivalent to py-2
        paddingHorizontal: 24, // Equivalent to px-6
        borderRadius: 6, // Equivalent to rounded
        backgroundColor: 'transparent',
        marginTop: 10, // Equivalent to mt-4
    },
    text: {
        color: '#6C9EE5', // Equivalent to indigo-700
        fontSize: 16,
    },
    icon: {
        width: 16, // Equivalent to w-4
        height: 16,
        marginLeft: 8, // Equivalent to ml-2
        color: '#6C9EE5',
    },
});

export default AllEvents;
