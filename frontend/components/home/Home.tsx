import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Ensure correct Firebase configuration

const Home: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollection = collection(db, 'events');
            const eventsSnapshot = await getDocs(eventsCollection);
            const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsList);
        };

        fetchEvents();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Welcome Message */}
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome to AquaVista!</Text>
                <Ionicons name="settings-outline" size={28} color="black" />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#999" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#999"
                />
            </View>

            {/* Explore Events */}
            <Text style={styles.sectionTitle}>Explore events</Text>
            <ScrollView horizontal={true} style={styles.eventsContainer} showsHorizontalScrollIndicator={false}>
                {events.slice(-4).map((event) => (
                    <TouchableOpacity key={event.id} style={styles.eventCard}>
                        <Image
                            source={{ uri: event.imageUrl || 'https://via.placeholder.com/150' }}
                            style={styles.eventImage}
                        />
                        <Text style={styles.eventText}>{event.title}</Text>
                    </TouchableOpacity>
                ))}

                {/* Explore More Card */}
                <TouchableOpacity style={[styles.eventCard, styles.exploreMoreCard]}>
                    <Ionicons name="arrow-forward-circle-outline" size={40} color="#007BFF" />
                    <Text style={styles.exploreMoreText}>Explore More</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Discover Ocean Sounds */}
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.buttonContent}>
                    <Ionicons name="musical-notes-outline" size={24} color="#333" />
                    <Text style={styles.buttonText}>Discover ocean sounds</Text>
                </View>
            </TouchableOpacity>

            {/* Check Out Trending Blogs */}
            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.buttonContent}>
                    <Ionicons name="flame-outline" size={24} color="#333" />
                    <Text style={styles.buttonText}>Check Out the Latest Trending Blogs</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 20,
        marginTop: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    eventsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
    },
    eventCard: {
        marginRight: 15,
        width: 200,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    eventImage: {
        width: '100%',
        height: 150, // Adjusted image height to match the increased card height
        resizeMode: 'cover',
    },
    eventText: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#d1e7ff',
        color: 'black',
        fontWeight: 'bold',
    },
    exploreMoreCard: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4ff',
    },
    exploreMoreText: {
        color: '#007BFF',
        fontWeight: 'bold',
        marginTop: 10,
    },
    actionButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        marginBottom: 15,
        marginTop: 20,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 10,
        color: '#333',
        fontSize: 16,
    },
});


export default Home;
