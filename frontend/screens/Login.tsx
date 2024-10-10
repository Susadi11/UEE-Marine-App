import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Main');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password functionality
    Alert.alert('Forgot Password', 'Password reset functionality to be implemented');
  };

  const handleGoogleLogin = () => {
    // Implement Google login functionality
    Alert.alert('Google Login', 'Google login functionality to be implemented');
  };

  const handleFacebookLogin = () => {
    // Implement Facebook login functionality
    Alert.alert('Facebook Login', 'Facebook login functionality to be implemented');
  };

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to your Account</Text>
      <Text style={styles.subtitle}>Enter your email and password to log in</Text>
      
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={[styles.input, styles.shadow]}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#9CA3AF"
      />
      
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={[styles.input, styles.shadow]}
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#9CA3AF"
      />
      
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or</Text>
        <View style={styles.dividerLine} />
      </View>
      
      <TouchableOpacity style={[styles.socialButton, styles.shadow]} onPress={handleGoogleLogin}>
        <Icon name="google" size={24} color="#DB4437" />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.socialButton, styles.shadow]} onPress={handleFacebookLogin}>
        <Icon name="facebook" size={24} color="#4267B2" />
        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  inputLabel: {
    marginBottom: 8,
    color: 'grey',
    fontFamily: 'Inter_600SemiBold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  forgotPassword: {
    color: '#6C9EE5',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 20,
    fontFamily: 'Inter_500Medium',
  },
  button: {
    backgroundColor: '#6C9EE5',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Inter_600SemiBold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Inter_500Medium',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'grey',
    fontFamily: 'Inter_500Medium',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter_600SemiBold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: 'gray',
    fontFamily: 'Inter_600SemiBold',
  },
  signupLink: {
    color: '#6C9EE5',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default Login;