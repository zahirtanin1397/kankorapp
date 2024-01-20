import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { DataStore } from "@aws-amplify/datastore";
import { TutorialCategory, TutorialSeason } from '../src/models';
import { useNavigation } from '@react-navigation/native';

const TutorialCategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await DataStore.query(TutorialCategory);

      // Fetch related TutorialSeason for each TutorialCategory
      const categoriesWithSeasons = await Promise.all(
        categoriesData.map(async (category) => {
          const seasonsData = await DataStore.query(TutorialSeason, (s) => s.tutorialcategoryID.eq(category.id));
          return { ...category, seasons: seasonsData };
        })
      );
      setCategories(categoriesWithSeasons);
    } catch (error) {
      console.log('Error while fetching categories:', error);
    }
  };

  const navigateToEpisodes = (seasonId) => {
    navigation.navigate('EpisodeScreen', { seasonId });
  };

  const renderCategory = ({ item }) => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <ScrollView horizontal>
          <View style={styles.seasonContainer}>
            {item.seasons.map((season) => (
              <TouchableOpacity
                key={season.id}
                style={styles.seasonName}
                onPress={() => navigateToEpisodes(season.id)}
              >
                 {/* تهیه و نگارش:استاد داکتر احسان نوری	  */}
                <Text style={{ color: 'black',fontSize : 15 }}>{season.name}</Text>
                <Text style={{ color: 'gray' }}> {"استاد :  "} {season.teacher}</Text>
                <Text style={{ color: 'gray' }}> {"سال : "} {season.year}</Text>
                <Text style={{ color: 'gray' }}> {"تعداد ویدیو : "} {season.numberOfVideo} </Text>
                <Text style={{ color: '#494646' }}>{season.description}</Text>
         
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 1,
    paddingHorizontal: 1,
    marginTop: 2,
  },
  categoryContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  categoryName: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a0a10',
    marginTop: 5,
    marginLeft: 9,
  },
  seasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  seasonName: {
    marginRight: 8,
    backgroundColor: 'white',
    borderWidth : 1,
    borderColor : "#065a2c",
    padding: 8,
    color: 'black',
    borderRadius: 8,
    width: 130,
    height: 200,
  },
});

export default TutorialCategoryScreen;