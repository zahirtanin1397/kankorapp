import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ToastAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import MathJax from "react-native-mathjax";
import { Formula } from '../../src/models';


const mathjaxOptions = {
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
  },
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
  },
}


const FormulaDetailsScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [formulas, setFormulas] = useState([]);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchFormulas = async () => {
    try {
      const formulasData = await DataStore.query(Formula, (f) => f.formulacategoryID.eq(categoryId));
      setFormulas(formulasData);
    } catch (error) {
      ToastAndroid.show('Failed to fetch formula data:', error, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchFormulas();
  }, [categoryId]);

  function containsMathNotation(text) {
    const mathRegex = /(\$.*?\$)/g;
    return mathRegex.test(text);
  }
  const renderItem = ({ item }) => (
    <View style={styles.formulaItem}>
      <Text style={styles.formulaTitle}>{item.name}</Text>
      {containsMathNotation(item.value) ? (
        <MathJax
          html= {item.value}
          mathJaxOptions={mathjaxOptions}
        />
      ) : (
        <Text style={styles.formulaContent}>{item.value}</Text>
      )}
      <View style={styles.lengthcontainer}></View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={formulas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>بازگشت</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  listContainer: {
    paddingBottom: 4,
  },
  formulaItem: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  formulaTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 1,
    padding : 10,
  },
  formulaContent: {
    fontSize: 16,
    color: '#666666',
  },
  goBackButton: {
    backgroundColor: '#110b63',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  question:{
    color : "black",
  },
  lengthcontainer:{
    width : "100%",
    height : 2,
    backgroundColor : "black",
  }
});

export default FormulaDetailsScreen;