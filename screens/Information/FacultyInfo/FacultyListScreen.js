import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Faculty } from '../../../src/models';
import { Storage} from 'aws-amplify';

const FacultyListScreen = ({ navigation }) => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const universitiesData = await DataStore.query(Faculty);
        const universitiesWithImages = await Promise.all(
          universitiesData.map(async (faculty) => {
            if (faculty.imageUri) {
              const imageUrl = await Storage.get(faculty.imageUri);
              return { ...faculty, imageUrl };
            }
            return faculty;
          })
        );
        setFaculties(universitiesWithImages);
      } catch (error) {
        console.error('Failed to fetch university data:', error);
      }
    };
    fetchUniversities();
  }, []);

  const handleFacultyPress = (faculty) => {
    navigation.navigate('FacultyDetailsScreen', { faculty });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={faculties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFacultyPress(item)}>
            <View style={styles.universityContainer}>
              <Text style={styles.universityName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#f5f5f5',
  },
  universityContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 6,
    elevation: 0.5,
    borderWidth : 1,
    borderColor : "#0d530d",
  },
  universityName: {
    fontSize: 20,
    color: 'gray',
  },
  universityImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default FacultyListScreen;