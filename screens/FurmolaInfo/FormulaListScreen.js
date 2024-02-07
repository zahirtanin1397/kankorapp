import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ToastAndroid, Pressable } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { FormulaCategory } from '../../src/models';
import {Hub} from "aws-amplify"
const FormulaListScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
         fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await DataStore.query(FormulaCategory);
      categoriesData.sort((a, b) => {
        const createdAtB = new Date(a.createdAt);
        const createdAtA = new Date(b.createdAt);
        return createdAtB - createdAtA;
      });

      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('FormulaList', { categoryId: category.id });
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.categoryItem} onPress={() => handleCategoryPress(item)}>
      <View style ={{flexDirection : "row"}}>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryDescription}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={fetchCategories}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  categoryItem: {
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 15,
    borderWidth: 2,
    borderColor: '#110b63',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryDescription  :{
    marginLeft : 15,
  }
});

export default FormulaListScreen;