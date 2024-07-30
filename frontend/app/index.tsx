import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider } from 'react-native-paper';
import WelcomePage from '@/screens/WelcomePage';
import HomePage from '@/screens/HomePage';
import EventPage from '@/screens/EventPage';
import SoundPage from '@/screens/SoundPage';
import BlogPage from '@/screens/BlogPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: string;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Events') {
                        iconName = 'calendar';
                    } else if (route.name === 'Blog') {
                        iconName = 'book';
                    } else if (route.name === 'Sounds') {
                        iconName = 'musical-notes';
                    } else {
                        iconName = 'information-circle'; // default icon
                    }

                    return <Ionicons name={iconName} color={color} size={size} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: { backgroundColor: '#000071' },
            })}
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Blog" component={BlogPage} />
            <Tab.Screen name="Events" component={EventPage} />
            <Tab.Screen name="Sounds" component={SoundPage} />
        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <PaperProvider>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Welcome" component={WelcomePage} options={{ headerShown: false }} />
                    <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                </Stack.Navigator>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 30,
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2,
    },
    subtitle: {
        marginTop: 30,
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 6,
    },
    button: {
        marginTop: 60,
        backgroundColor: 'black',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default App;
