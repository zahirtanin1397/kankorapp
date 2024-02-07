import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { TutorialCategory, TutorialSeason } from "../src/models";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
const TutorialCategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await DataStore.query(TutorialCategory);

      categoriesData.sort((a, b) => {
           // Convert createdAt to the appropriate type if needed
           const createdAtB = new Date(a.createdAt);
           const createdAtA = new Date(b.createdAt);
   
           // Compare the createdAt values
           return createdAtB - createdAtA;
      });

      // Fetch related TutorialSeason for each TutorialCategory
      const categoriesWithSeasons = await Promise.all(
        categoriesData.map(async (category) => {
          const seasonsData = await DataStore.query(TutorialSeason, (s) =>
            s.tutorialcategoryID.eq(category.id)
          );
          
          seasonsData.sort((a, b) => {
            // Convert createdAt to the appropriate type if needed
            const createdAtB = new Date(a.createdAt);
            const createdAtA = new Date(b.createdAt);
    
            // Compare the createdAt values
            return createdAtB - createdAtA;
       });

          return { ...category, seasons: seasonsData };
        })
      );
      setCategories(categoriesWithSeasons);
    } catch (error) {
      ToastAndroid.show(
        "Error while fetching categories:",
        error,
        ToastAndroid.SHORT
      );
    }
  };

  const navigateToEpisodes = (seasonId) => {
    navigation.navigate("EpisodeScreen", { seasonId });
  };

  const renderCategory = ({ item }) => {
    return (
      <View style={styles.categoryContainer}  >
        <Text style={styles.categoryName}>{item.name}</Text>
        <ScrollView horizontal  showsHorizontalScrollIndicator={false}  >
          <View style={styles.seasonContainer}>
            {item.seasons.map((season) => (
              <Pressable
                key={season.id}
                style={styles.seasonName}
                onPress={() => navigateToEpisodes(season.id)}
              >
                <ScrollView showsVerticalScrollIndicator={false}  >
                  <Text style={styles.seasonText}>{season.name}</Text>
                  <Text style={styles.teacherText}>
                    استاد: {season.teacher}
                  </Text>
                  <Text style={styles.yearText}>سال: {season.year}</Text>
                  <Text style={styles.videoCountText}>
                    تعداد ویدیو: {season.numberOfVideo}
                  </Text>
                  <Text style={styles.descriptionText}>
                    {season.description}
                  </Text>
                </ScrollView>
              </Pressable>
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
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await fetchCategories();
          setRefreshing(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 1,
    paddingHorizontal: 16,
    marginTop: 2,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0a0a10",
    marginTop: 5,
    marginLeft: 9,
  },
  seasonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  seasonName: {
    marginRight: 8,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#110b63",
    padding: 8,
    color: "#000",
    borderRadius: 8,
    width: 130,
    height: 200,
  },
  seasonText: {
    color: "black",
    fontSize: 15,
    marginBottom: 8,
  },
  teacherText: {
    color: "gray",
    marginBottom: 4,
  },
  yearText: {
    color: "gray",
    marginBottom: 4,
  },
  videoCountText: {
    color: "gray",
    marginBottom: 4,
  },
  descriptionText: {
    color: "#494646",
  },
});

export default TutorialCategoryScreen;
