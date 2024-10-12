import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, updateEmail, updatePassword, signOut } from 'firebase/auth';



const Profile = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Monitor authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '');
        loadProfileImage(user.uid);
      } else {
        navigation.replace('Login');
      }
    });

    return unsubscribe;
  }, []);

  // Load the profile image from Firebase Storage
  const loadProfileImage = async (uid: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, `profileImages/${uid}`);
    try {
      const url = await getDownloadURL(imageRef);
      setImage(url);
    } catch (err) {
      console.log("No image found", err);
      setImage(null); // Reset image if not found
    }
  };

  // Function to handle profile image selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update the image state
      uploadImage(result.assets[0].uri); // Upload the selected image
    }
  };

  const uploadImage = async (uri: string) => {
    const auth = getAuth();
    const storage = getStorage();
    const user = auth.currentUser;

    if (user) {
      const imageRef = ref(storage, `profileImages/${user.uid}`);
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      Alert.alert('Success', 'Profile image uploaded successfully');
    }
  };

  const handleUpdateEmail = async () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation: Check if new email is valid
    if (!emailRegex.test(newEmail)) {
        Alert.alert('Error', 'Please enter a valid email address.');
        return;
    }

    // Validation: Ensure new email is different from current email
    if (newEmail === email) {
        Alert.alert('Error', 'The new email must be different from the current email.');
        return;
    }

    try {
        const auth = getAuth();
        if (auth.currentUser) {
            await updateEmail(auth.currentUser, newEmail);
            Alert.alert('Success', 'Email updated successfully');
            setEmail(newEmail);
            setNewEmail('');
            setIsEditingEmail(false);
        }
    } catch (err: any) {
        // Enhanced error handling
        if (err.code === 'auth/email-already-in-use') {
            Alert.alert('Error', 'This email is already in use. Please choose another email.');
        } else if (err.code === 'auth/invalid-email') {
            Alert.alert('Error', 'The provided email is not valid.');
        } else if (err.code === 'auth/requires-recent-login') {
            Alert.alert('Error', 'Please log in again to change your email address.');
        } else {
            Alert.alert('Error', err.message); // General error message
        }
    }
};


  const handleUpdatePassword = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        Alert.alert('Success', 'Password updated successfully');
        setNewPassword(''); // Clear the new password field
        setIsEditingPassword(false); // Exit editing mode
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={150} color="gray" />
        )}
        <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Display Current Email */}
      <Text style={styles.emailText}>{email}</Text>

      {/* Change Email Card */}
      <TouchableOpacity style={styles.card} onPress={() => setIsEditingEmail(!isEditingEmail)}>
        <Text style={styles.cardTitle}>Change Email</Text>
      </TouchableOpacity>
      {isEditingEmail && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Email"
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdateEmail}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Change Password Card */}
      <TouchableOpacity style={styles.card} onPress={() => setIsEditingPassword(!isEditingPassword)}>
        <Text style={styles.cardTitle}>Change Password</Text>
      </TouchableOpacity>
      {isEditingPassword && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePassword}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Logout Button */}
      <TouchableOpacity style={[styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10, // Adjusted margin for better spacing
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6C9EE5',
    borderRadius: 20,
    padding: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20, // Added margin for spacing
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  saveButton: {
    marginLeft: 10,
    backgroundColor: '#6C9EE5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#E57373',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Profile;
