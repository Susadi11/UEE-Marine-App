import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const BlogDetail = () => {
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
        <Text style={styles.subtitle}>#1. What is Lorem Ipsum?</Text>
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
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
});

export default BlogDetail;
