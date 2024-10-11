import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, TextInput, Image } from 'react-native';
import { getFirestore, collection, onSnapshot, deleteDoc, doc, where, query } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { getAuth } from 'firebase/auth';
import Svg, { Path } from 'react-native-svg';
import SearchBar from '@/components/Vindi/SearchBar';

type RootStackParamList = {
  EventDetail: { eventData: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EventDetail'>;

const MyEventPage: React.FC = () => {
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const firestore = getFirestore(app);
  const navigation = useNavigation<NavigationProp>();
  const auth = getAuth();
  const [activeTab, setActiveTab] = useState('My Events');

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const eventCollection = collection(firestore, 'events');
    const q = query(eventCollection, where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const eventList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMyEvents(eventList);
      },
      (error) => {
        console.error('Error fetching events: ', error);
        Alert.alert('Error', 'Unable to fetch events');
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredEvents = myEvents.filter(event =>
    event.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAttendEvent = (event: any) => {
   
    navigation.navigate('EventDetails', { event });
};
const handleEdit = (eventId: string) => {
  const selectedEvent = myEvents.find(event => event.id === eventId);
  if (selectedEvent) {
    navigation.navigate('EditEvent', { eventData: selectedEvent });
  } else {
    console.error('Event not found:', eventId);
    Alert.alert('Error', 'Failed to load event details');
  }
};


  const handleDelete = async (eventId: string) => {
    try {
      await deleteDoc(doc(firestore, 'events', eventId));
      console.log('Event deleted:', eventId);
      // setSelectedEventId(null); // Commented out as setSelectedEventId is not defined
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Failed to delete the event');
    }
  };

  const renderContextMenu = (eventId: string) => {
    if (selectedEventId !== eventId) return null;

    if (!fontsLoaded) {
      return null; // or a loading indicator
    }


return (
  <View style={styles.contextMenu}>
    <TouchableOpacity style={styles.menuItem} onPress={() => handleEdit(eventId)}>
      <Ionicons name="create-outline" size={20} color="#4b5563" />
      <Text style={styles.menuItemText}>Edit</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuItem} onPress={() => handleDelete(eventId)}>
      <Ionicons name="trash-outline" size={20} color="#4b5563" />
      <Text style={styles.menuItemText}>Delete</Text>
    </TouchableOpacity>
  </View>
);
};
  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for event"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Ionicons name="search" size={20} color="#888" style={{ position: 'absolute', right: 20, top: 15 }} />
      </View>
      {/* Navigation Tabs */}
      <View style={styles.navButtons}>
        {['All Events', 'My Events'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.navButton, activeTab === tab && styles.activeNavButton]}
            onPress={() => {
              setActiveTab(tab);
              if (tab === 'All Events') {
                navigation.navigate('AllEvents');
              }
            }}
          >
            <Text style={[styles.navButtonText, activeTab === tab && styles.activeNavButtonText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Event List */}
      {filteredEvents.map(event => (
        
        <View key={event.id} style={styles.eventCard}>
         
          <TouchableOpacity style={styles.imageContainer} onPress={() => { /* Handle image press */ }}>
            {event.imageUrl && <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />}
             <TouchableOpacity
                style={styles.menuIcon}
                onPress={() => setSelectedEventId(selectedEventId === event.id ? null : event.id)}
              >
                <Ionicons name="ellipsis-vertical" size={24} color="#4b5563" />
              </TouchableOpacity>
              {renderContextMenu(event.id)}
               
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
          
            <Text style={styles.eventName}>{event.title}</Text>
            <Text style={styles.eventDate}>{event.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleAttendEvent(event)}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.009)',
  },
  contextMenu: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuIcon: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 5,
  },
  detailsContainer: {
    padding: 15,
},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuItemText: {
    marginLeft: 10,
    color: '#4b5563',
    fontFamily: 'Inter_600SemiBold',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderColor: '#eee',
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderColor: '#eee',
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
  inputContainer: {
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 50,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 15,
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
    height: 200,
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
    fontWeight: 'semibold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6C9EE5',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  text: {
    color: '#6C9EE5',
    fontSize: 16,
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    color: '#6C9EE5',
  },
});

export default MyEventPage;
