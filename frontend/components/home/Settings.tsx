import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; // Import Slider from the correct package
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundLevel, setSoundLevel] = useState(50);
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);
  if (!fontsLoaded) {
    return null; // or a loading indicator
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#000" }}
          thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>

      {/* Profile */}
      <TouchableOpacity style={styles.settingContainer}>
        <Text style={styles.label}>My Profile</Text>
        <Ionicons name="person-circle-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* Sounds */}
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Sounds</Text>
        <MaterialCommunityIcons name="volume-high" size={30} color="black" />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={soundLevel}
          onValueChange={setSoundLevel}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#767577"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Inter_700Bold',
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  slider: {
    width: 150,
    height: 40,
  },
});

export default Settings;
