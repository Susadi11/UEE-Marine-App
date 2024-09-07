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
import TabBar from '@/components/NavBar/TabBar';
import SeaWaveTrack from '@/screens/SeaWaweTrack';

// Define stack navigators for each feature
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
      component={BlogDetail}
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
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    tabBar={props => <TabBar {...props} />} // Use custom TabBar
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen
      name="Home"
      component={HomePage}
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen
      name="Blog"
      component={BlogStack} // Use BlogStack here
      options={{ tabBarLabel: 'Blog' }}
    />
    <Tab.Screen
      name="Events"
      component={EventStack} // Use EventStack here
      options={{ tabBarLabel: 'Events' }}
    />
    <Tab.Screen
      name="Sounds"
      component={SoundStack} // Use SoundStack here
      options={{ tabBarLabel: 'Sounds' }}
    />
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
            options={{ title: 'Sea Wave Track' }}
      />

    </Stack.Navigator>
);

export default App;
