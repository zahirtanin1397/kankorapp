import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { FormulaCategory } from '../../src/models';

const FormulaListScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await DataStore.query(FormulaCategory);
      setCategories(categoriesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('FormulaList', { categoryId: category.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item)}>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
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
    borderWidth : 1,
    borderColor : "green"
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormulaListScreen;