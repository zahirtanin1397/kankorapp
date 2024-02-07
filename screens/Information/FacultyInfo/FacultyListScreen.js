import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image, ToastAndroid } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Faculty } from '../../../src/models';
import { Storage} from 'aws-amplify';

const FacultyListScreen = ({ navigation }) => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const universitiesData = await DataStore.query(Faculty);
      universitiesData.sort((a, b) => {
        const createdAtB = new Date(a.createdAt);
        const createdAtA = new Date(b.createdAt);
        return createdAtB - createdAtA;
      });
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
      setLoading(false);
    } catch (error) {
      ToastAndroid.show('Failed to fetch university data:', error, ToastAndroid.SHORT);
    }
  };

  const handleFacultyPress = (faculty) => {
    navigation.navigate('FacultyDetailsScreen', { faculty });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={faculties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleFacultyPress(item)}>
            <View style={styles.universityContainer}>
              <Text style={styles.universityName}>{item.name}</Text>
            </View>
          </Pressable>
        )}
        refreshing={loading}
        onRefresh={fetchUniversities}
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
    elevation: 1,
    borderWidth : 2,
    borderColor : "#110b63",
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