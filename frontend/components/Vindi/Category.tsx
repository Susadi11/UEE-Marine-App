import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface CategoryProps {
  title: string;
  imageUrl: string;
  navigateTo?: string;
}

const Category: React.FC<CategoryProps> = ({ title, imageUrl, navigateTo }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <TouchableOpacity style={styles.categoryCard} onPress={handlePress}>
      <Image 
        style={styles.categoryImage} 
        source={{ uri: imageUrl }} 
      />
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    margin: 2,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'flex-end', // Align text at the bottom
    marginBottom:5,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryTextContainer: {
    position: 'absolute',
    bottom: 3,
    left: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 1,
    borderRadius: 5,
  },
  categoryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Category;
