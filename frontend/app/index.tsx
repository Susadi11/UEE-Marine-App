import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Text } from 'react-native';

// Import all screens and components
import Login from '@/screens/Login';
import Signup from '@/screens/Signup';
import WelcomePage from '@/screens/WelcomePage';
import HomePage from '@/screens/HomePage';
import BlogPage from '@/screens/BlogPage';
import BlogDetail from '@/screens/BlogDetailPage';
import SoundPage from '@/screens/SoundPage';
import MusicPlayer from '@/screens/MusicPlayer';
import MusicPlayer1 from '@/screens/MusicPlayer1';
import EventPage from '@/screens/EventPage';
import EventAdd from '@/screens/EventAdd';
import EventDetails from '@/screens/EventDetails';
import SetReminder from '@/screens/SetReminder';
import SeaWaveTrack from '@/screens/SeaWaweTrack';
import ExploreEvents from '@/screens/ExploreEvents';
import Map from '@/screens/Map';
import Settings from '@/components/home/Settings';
import Favorite from '@/screens/Favourite';
import TrendingPage from '@/screens/Blogs/TrendingPage';
import PremiumPage from '@/screens/PremiumPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BlogStack = () => (
  <Stack.Navigator initialRouteName="BlogPage">
    <Stack.Screen
      name="BlogPage"
      component={BlogPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BlogDetail"
      component={BlogDetail as React.ComponentType<any>}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TrendingPage"
      component={TrendingPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const SoundStack = () => (
  <Stack.Navigator initialRouteName="SoundPage">
    <Stack.Screen
      name="SoundPage"
      component={SoundPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MusicPlayer"
      component={MusicPlayer}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MusicPlayer1"
      component={MusicPlayer1}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Favourite"
      component={Favorite}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const EventStack = () => (
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
    <Stack.Screen                    
      name="ExploreEvents"
      component={ExploreEvents}
      options={{ headerShown: false }}
    />
    <Stack.Screen                    
      name="EventDetails"
      component={EventDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen                    
      name="SetReminder"
      component={SetReminder}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const scale = useSharedValue(0);
        React.useEffect(() => {
          scale.value = withSpring(focused ? 1 : 0, { duration: 350 });
        }, [focused]);

        const animatedIconStyle = useAnimatedStyle(() => {
          const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
          const top = interpolate(scale.value, [0, 1], [0, 8]);
          return {
            transform: [{ scale: scaleValue }],
            top,
          };
        });

        const iconMap: { [key: string]: string } = {
          Home: 'home',
          Blog: 'forum-outline',
          Events: 'calendar-outline',
          Sounds: 'music-circle-outline',
        };

        const iconName = iconMap[route.name] || 'question-mark';

        return (
          <Animated.View style={[animatedIconStyle]}>
            {iconName === 'calendar-outline' ? (
              <Ionicons name={iconName} size={size} color={color} />
            ) : (
              <MaterialCommunityIcons name={iconName} size={size} color={color} />
            )}
          </Animated.View>
        );
      },
      tabBarLabel: ({ focused, color }) => (
        <Animated.Text style={[{ color, fontSize: 11 }]}>
          <Text>{route.name}</Text>
        </Animated.Text>
      ),
      tabBarActiveTintColor: '#6C9EE5',
      tabBarInactiveTintColor: '#000000',
      tabBarStyle: {
        height: 70,
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderTopColor: '#ddd',
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Blog" component={BlogStack} />
    <Tab.Screen name="Events" component={EventStack} />
    <Tab.Screen name="Sounds" component={SoundStack} />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={MainTabs} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="SeaWaveTrack" component={SeaWaveTrack} />
    <Stack.Screen name="MapScreen" component={Map} />
    <Stack.Screen name="PremiumPage" component={PremiumPage} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        setInitializing(false);
      } catch (error) {
        console.error('Error reading user from AsyncStorage:', error);
        setInitializing(false);
      }
    };

    checkUser();

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        await AsyncStorage.setItem('user', JSON.stringify(firebaseUser));
        setUser(firebaseUser);
      } else {
        // User is signed out
        await AsyncStorage.removeItem('user');
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
  );
};

export default App;