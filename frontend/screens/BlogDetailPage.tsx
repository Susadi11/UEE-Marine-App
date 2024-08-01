import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';

interface ImageItem {
  url: string;
  title: string;
  description?: string;
}

const BlogDetail: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const images: ImageItem[] = [
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', title: 'Explore Nature', description: 'Discover the beauty of the natural world' },
    { url: 'https://images.unsplash.com/photo-1493770348161-369560ae357d', title: 'Culinary Delights' },
    { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', title: 'Tech Innovations' },
    { url: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b', title: 'Travel Adventures' },
    { url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f', title: 'Artistic Expressions' },
    { url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635', title: 'Swimming' },
    { url: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763', title: 'Chess' },
    { url: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c', title: 'Football' },
    { url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972', title: 'Cricket' },
  ];

  const openImageModal = (index: number) => {
    setSelectedImage(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  const navigateImage = (direction: number) => {
    if (selectedImage === null) return;
    let newIndex = selectedImage + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setSelectedImage(newIndex);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://api.time.com/wp-content/uploads/2020/07/never-trumpers-2020-election-01.jpg?quality=85&w=1201&h=676&crop=1' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Revenge of the Never Trumpers</Text>
        <Text style={styles.author}>
          Written By: <Text style={styles.authorName}>Ahmad Sultani</Text> In <Text style={styles.category}>Election</Text>, <Text style={styles.category}>Politics</Text>
        </Text>
        <Text style={styles.bodyText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        
        {/* Image Grid */}
        <View style={styles.imageGrid}>
          {images.map((image, index) => (
            <TouchableOpacity key={index} style={styles.gridItem} onPress={() => openImageModal(index)}>
              <Image source={{ uri: image.url }} style={styles.gridImage} />
              <View style={styles.gridOverlay}>
                <Text style={styles.gridTitle}>{image.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.bodyText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <Text style={styles.quote}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
        <Text style={styles.bodyText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
          leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <View style={styles.tags}>
          <Text style={styles.tag}>#Election</Text>
          <Text style={styles.tag}>#people</Text>
          <Text style={styles.tag}>#Election2020</Text>
          <Text style={styles.tag}>#trump</Text>
          <Text style={styles.tag}>#Joe</Text>
        </View>
      </View>

      {/* Full Screen Image Modal */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={closeImageModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {selectedImage !== null && (
            <Image source={{ uri: images[selectedImage].url }} style={styles.fullScreenImage} resizeMode="contain" />
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
  image: {
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
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 20,
  },
  authorName: {
    color: '#6366F1',
  },
  category: {
    color: '#6366F1',
  },
  bodyText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
  },
  quote: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
    paddingLeft: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  tag: {
    marginRight: 10,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#F3F4F6',
    color: '#111827',
    borderRadius: 5,
    fontSize: 12,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
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
});

export default BlogDetail;