import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ route }) => {
  const { blogData } = route.params;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

  return (
    <ScrollView style={styles.container}>
      {blogData.blog_coverPhoto && (
        <Image
          source={{ uri: blogData.blog_coverPhoto }}
          style={styles.coverImage}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{blogData.blog_title}</Text>
        {blogData.blog_author && (
          <Text style={styles.author}>
            Written By: <Text style={styles.authorName}>{blogData.blog_author}</Text>
          </Text>
        )}
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

      <Modal visible={modalVisible} transparent={true} onRequestClose={closeImageModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {selectedImage !== null && blogData.blog_images && (
            <Image source={{ uri: blogData.blog_images[selectedImage] }} style={styles.fullScreenImage} resizeMode="contain" />
          )}
          <TouchableOpacity style={styles.navButton} onPress={() => navigateImage(-1)}>
            <Text style={styles.navButtonText}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navButton, styles.navButtonRight]} onPress={() => navigateImage(1)}>
            <Text style={styles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 20,
  },
  authorName: {
    color: '#6366F1',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
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
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  gridTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  closeButtonText: {
    color: '#fff',
    fontSize: 40,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  navButtonText: {
    color: '#fff',
    fontSize: 30,
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