import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider as PaperProvider } from 'react-native-paper';
import WelcomePage from '@/screens/WelcomePage';
import HomePage from '@/screens/HomePage';
import EventPage from '@/screens/EventPage';
import SoundPage from '@/screens/SoundPage';
import BlogPage from '@/screens/BlogPage';
import BlogDetail from '@/screens/BlogDetailPage';
import SeaWaveTrack from '@/screens/SeaWaweTrack';
import EventShow from '@/screens/EventShow';
import EventAdd from '@/screens/EventAdd';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#000000"
            inactiveColor="#ffffff"
            barStyle={{ backgroundColor: '#000071' }}
            shifting={true}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName: string;
                    let IconComponent: typeof Ionicons;

                    if (route.name === 'Home') {
                        iconName = 'home';
                        IconComponent = MaterialCommunityIcons;
                    } else if (route.name === 'Events') {
                        iconName = 'calendar';
                        IconComponent = MaterialCommunityIcons;
                    } else if (route.name === 'Blog') {
                        iconName = 'forum-outline';
                        IconComponent = MaterialCommunityIcons;
                    } else if (route.name === 'Sounds') {
                        iconName = 'music';
                        IconComponent = MaterialCommunityIcons;
                    } else {
                        iconName = 'information-circle'; // default icon
                        IconComponent = Ionicons;
                    }

                    return <IconComponent name={iconName} color={color} size={26} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Blog"
                component={BlogStack}
                options={{
                    tabBarLabel: 'Blog',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="forum-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Events"
                component={EventStack}
                options={{
                    tabBarLabel: 'Events',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar-multiselect" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Sounds"
                component={SoundPage}
                options={{
                    tabBarLabel: 'Sounds',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="music" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const BlogStack = () => {
    return (
        <Stack.Navigator initialRouteName="BlogPage">
            <Stack.Screen
                name="BlogPage"
                component={BlogPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BlogDetail"
                component={BlogDetail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const App = () => {
    return (
        <PaperProvider>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen
                        name="Welcome"
                        component={WelcomePage}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Main"
                        component={MainTabs}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SeaWaveTrack"
                        component={SeaWaveTrack}
                        options={{ title: 'Sea Wave Track' }}
          />
                </Stack.Navigator>
        </PaperProvider>
    );
};

const EventStack = () => {
    return (
        <Stack.Navigator initialRouteName="EventPage">
            <Stack.Screen
                name="EventPage"
                component={EventPage}
                options={{ headerShown: false }}  
            />
            <Stack.Screen
                name="EventAdd"
                component={EventAdd}
                options={{ headerShown: false }}  
            />
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
 
