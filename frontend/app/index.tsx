import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
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
      activeColor="#b07a33"
      inactiveColor="#ffffff"
      shifting={true}
      barStyle={styles.floatingBarStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          let IconComponent = MaterialCommunityIcons;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Events') {
            iconName = 'calendar';
          } else if (route.name === 'Blog') {
            iconName = 'forum-outline';
          } else if (route.name === 'Sounds') {
            iconName = 'music';
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
        }}
      />
      <Tab.Screen
        name="Blog"
        component={BlogStack}
        options={{
          tabBarLabel: 'Blog',
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventStack}
        options={{
          tabBarLabel: 'Events',
        }}
      />
      <Tab.Screen
        name="Sounds"
        component={SoundPage}
        options={{
          tabBarLabel: 'Sounds',
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

const styles = StyleSheet.create({
  floatingBarStyle: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: '#1d6ab5',
    borderRadius: 50,
    height: 70,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
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
