import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

interface ImageItem {
  url: string;
  title: string;
  description?: string;
}

interface BlogData {
  blog_coverPhoto: string;
  blog_title: string;
  blog_author?: string;
  blog_sciname?: string;
  blog_physicalCharacteristics?: string;
  blog_category?: string;
  blog_images?: string[]; // Changed from ImageItem[] to string[]
  blog_habitatDistribution?: string;
  blog_behavior?: string;
  blog_importanceEcosystem?: string;
}

type RootStackParamList = {
  BlogDetail: { blogData: BlogData };
};

type BlogDetailPageProps = NativeStackScreenProps<RootStackParamList, 'BlogDetail'>;

const { width, height } = Dimensions.get('window');

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ route, navigation }) => {
  const { blogData } = route.params;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (!blogData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Blog data not available</Text>
      </View>
    );
  }

  const openImageModal = (index: number) => {
    setSelectedImage(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  const navigateImage = (direction: number) => {
    if (selectedImage === null || !blogData.blog_images) return;
    let newIndex = selectedImage + direction;
    if (newIndex < 0) newIndex = blogData.blog_images.length - 1;
    if (newIndex >= blogData.blog_images.length) newIndex = 0;
    setSelectedImage(newIndex);
  };
  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{blogData.blog_title}</Text>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: blogData.blog_coverPhoto }}
            style={styles.coverImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{blogData.blog_title}</Text>
            {blogData.blog_author && (
              <Text style={styles.author}>
                Written by <Text style={styles.authorName}>{blogData.blog_author}</Text>
              </Text>
            )}
          </View>
        </View>
        <View style={styles.content}>
          {blogData.blog_sciname && (
            <Text style={styles.bodyText}>{blogData.blog_sciname}</Text>
          )}
          {blogData.blog_physicalCharacteristics && (
            <Text style={styles.bodyText}>{blogData.blog_physicalCharacteristics}</Text>
          )}
          {blogData.blog_category && (
            <Text style={styles.bodyText}>{blogData.blog_category}</Text>
          )}
          {blogData.blog_images && blogData.blog_images.length > 0 && (
            <View style={styles.imageGrid}>
              {blogData.blog_images.map((imageUrl, index) => (
                <TouchableOpacity key={index} style={styles.gridItem} onPress={() => openImageModal(index)}>
                  <Image source={{ uri: imageUrl }} style={styles.gridImage} />
                </TouchableOpacity>
              ))}
            </View>
          )}
          {blogData.blog_habitatDistribution && (
            <Text style={styles.bodyText}>{blogData.blog_habitatDistribution}</Text>
          )}
          {blogData.blog_behavior && (
            <Text style={styles.bodyText}>{blogData.blog_behavior}</Text>
          )}
          {blogData.blog_importanceEcosystem && (
            <Text style={styles.bodyText}>{blogData.blog_importanceEcosystem}</Text>
          )}
        </View>
      </Animated.ScrollView>

      <Modal visible={modalVisible} transparent={true} onRequestClose={closeImageModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {selectedImage !== null && blogData.blog_images && (
            <Image source={{ uri: blogData.blog_images[selectedImage] }} style={styles.fullScreenImage} resizeMode="contain" />
          )}
          <TouchableOpacity style={styles.navButton} onPress={() => navigateImage(-1)}>
            <Ionicons name="chevron-back" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, styles.navButtonRight]} onPress={() => navigateImage(1)}>
            <Ionicons name="chevron-forward" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 18,
  },
  coverImageContainer: {
    height: height * 0.4,
    width: '100%',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontFamily: 'Inter_700Bold',
  },
  author: {
    fontSize: 16,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  authorName: {
    color: '#6366F1',
    fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 25,
    marginBottom: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  bodyText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  gridItem: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonRight: {
    left: undefined,
    right: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default BlogDetailPage;