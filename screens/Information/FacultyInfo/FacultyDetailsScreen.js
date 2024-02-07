import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FacultyDetailsScreen = ({ route }) => {
  const { faculty } = route.params;

  const navigation = useNavigation();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescription = () => {
    if (showFullDescription) {
      return faculty.description;
    }
    const words = faculty.description.split(' ');
    const trimmedDescription = words.slice(0, 15).join(' ');
    return trimmedDescription + '...';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
   
      <Text style={styles.name}>{faculty.name}</Text>

      <Image
        source={{ uri: faculty.imageUrl }}
        style={styles.photo}
        resizeMode="cover"
      />
    
      <Text style={styles.description}>{getDescription()}</Text>
      {!showFullDescription && (
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.moreText}>بیشتر بخانید... </Text>
        </TouchableOpacity>
      )}
      {showFullDescription && (
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.moreText}> بستن </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.goBackText}>بازگشت به لیست رشته ها</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
  },
  photo: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop : 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  moreText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 10,
  },
  goBackText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FacultyDetailsScreen;