// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomePage from '@/screens/WelcomePage';
import HomePage from '@/screens/HomePage';
import BlogPage from '@/screens/BlogPage';
import BlogDetail from '@/screens/BlogDetailPage';
import SoundPage from '@/screens/SoundPage';
import MusicPlayer from '@/screens/MusicPlayer';
import EventPage from '@/screens/EventPage';
import EventAdd from '@/screens/EventAdd';
import EventDetails from '@/screens/EventDetails';
import SetReminder from '@/screens/SetReminder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SeaWaveTrack from '@/screens/SeaWaweTrack';
import ExploreEvents from '@/screens/ExploreEvents';
import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


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
        useEffect(() => {
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

const App = () => (
  
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
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
);

export default App;