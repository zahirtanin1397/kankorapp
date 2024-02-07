import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ToastAndroid, Pressable} from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { University } from '../../../src/models';
import { Storage} from 'aws-amplify';

const UniversityListScreen = ({ navigation }) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const universitiesData = await DataStore.query(University);
      universitiesData.sort((a, b) => {
        const createdAtB = new Date(a.createdAt);
        const createdAtA = new Date(b.createdAt);
        return createdAtB - createdAtA;
      });
      const universitiesWithImages = await Promise.all(
        universitiesData.map(async (university) => {
          if (university.inageUri) {
            const imageUrl = await Storage.get(university.inageUri);
            return { ...university, imageUrl };
          }
          return university;
        })
      );
      setUniversities(universitiesWithImages);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show('Failed to fetch university data:', error, ToastAndroid.SHORT);
    }
  };

  const handleUniversityPress = (university) => {
    navigation.navigate('UniversityDetails', { university });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={universities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleUniversityPress(item)}>
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
    padding: 6,
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

export default UniversityListScreen;