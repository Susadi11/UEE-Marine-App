// firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage,ref,getDownloadURL} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6K-LeV2UWfnX-cOmNCjNSFkxJ9OhFaYM",
  authDomain: "aquavista-abc60.firebaseapp.com",
  projectId: "aquavista-abc60",
  storageBucket: "aquavista-abc60.appspot.com",
  messagingSenderId: "742724441160",
  appId: "1:742724441160:web:b5c2cab89eef48810ef47d",
  measurementId: "G-W13QKTHFC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firestore
const db = getFirestore(app);


// Initialize Analytics (optional)
const analytics = getAnalytics(app);

const storage = getStorage(app);

// Function to get the download URL for a file in Firebase Storage
export const getAudioUrl = async (filePath: string): Promise<string> => {
  try {
    const audioRef = ref(storage, filePath);
    const url = await getDownloadURL(audioRef);
    return url;
  } catch (error) {
    console.error('Error fetching audio URL:', error);
    throw error;
  }
};


// Export the initialized app and analytics if needed
export { app, db, analytics, storage };
