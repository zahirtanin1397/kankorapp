import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { University } from '../../../src/models';
import { Storage} from 'aws-amplify';

const UniversityListScreen = ({ navigation }) => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const universitiesData = await DataStore.query(University);
        const universitiesWithImages = await Promise.all(
          universitiesData.map(async (university) => {
            if (university.imageUri) {
              const imageUrl = await Storage.get(university.imageUri);
              return { ...university, imageUrl };
            }
            return university;
          })
        );
        setUniversities(universitiesWithImages);
      } catch (error) {
        console.error('Failed to fetch university data:', error);
      }
    };
    fetchUniversities();
  }, []);

  const handleUniversityPress = (university) => {
    navigation.navigate('UniversityDetails', { university });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={universities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUniversityPress(item)}>
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
    padding: 6,
    backgroundColor: '#f5f5f5',
  },
  universityContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 16,
    marginBottom: 6,
    elevation: 0.5,
    borderWidth : 1,
    borderColor : "#166b16",
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

export default UniversityListScreen;