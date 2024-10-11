import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CalendarEvents from 'react-native-calendar-events'; // For managing calendar events
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const EventDetails = ({ route }: any) => {
    const navigation = useNavigation(); // Use the hook to get navigation object
    const { event } = route.params; // Get the event data from route params

    // Format the date and time
    const formattedDate = new Date(event.date).toISOString().split('T')[0]; // Extract "YYYY-MM-DD"
    const formattedTime = new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format "HH:MM AM/PM"

    const handleNavigateToReminder = () => {
        navigation.navigate('SetReminder', { event });
    };

    const handleAddToCalendar = async () => {
        const { date, time, title, description } = event;
        const eventDate = new Date(`${date} ${date}`);
        const eventTime = new Date(`${date} ${time}`);
 
        try {
            await CalendarEvents.saveEvent(title, {
                startDate: eventDate.toISOString(),
                endDate: eventTime.toISOString(),
                notes: description,
                location: `Latitude: ${event.location.latitude}, Longitude: ${event.location.longitude}`,
            });
            Alert.alert('Success', 'Event added to your calendar');
        } catch (error) {
            Alert.alert('Error', 'Failed to add event to calendar');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: event.imageUrl }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.date}>Date: {formattedDate}</Text>
                <Text style={styles.time}>Time: {formattedTime}</Text>
                
                <Text style={styles.description}>{event.description}</Text>

                <TouchableOpacity style={styles.calendarButton} onPress={handleNavigateToReminder}>
                    <Icon name="calendar" size={20} color="#fff" />
                    <Text style={styles.calendarButtonText}>Set Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.locationButton} onPress={handleAddToCalendar}>
                    <Icon name="map-marker" size={20} color="#fff" />
                    <Text style={styles.locationButtonText}>Location</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    detailsContainer: {
        padding: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginTop: -30, // Overlap with image
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    date: {
        fontSize: 18,
        color: '#250071',
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 10,
    },
    time: {
        fontSize: 18,
        color: '#250071',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 18,
        color: '#555',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
    },
    calendarButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    calendarButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    locationButton: {
        backgroundColor: '#6C9EE5',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    locationButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default EventDetails;
