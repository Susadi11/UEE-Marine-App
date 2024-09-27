import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the checkmark icon

interface CustomMessageProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onHide: () => void;
}

const CustomMessage: React.FC<CustomMessageProps> = ({ message, type = 'info', visible, onHide }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show message with fade-in effect
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Hide message after 3 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(onHide);
      }, 3000);
    }
  }, [visible]);

  return visible ? (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <View style={[styles.container, styles[type]]}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={30} color="#4CAF50" />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  success: {
    borderColor: '#4CAF50',
  },
  error: {
    borderColor: '#f44336',
  },
  info: {
    borderColor: '#2196F3',
  },
});

export default CustomMessage;
