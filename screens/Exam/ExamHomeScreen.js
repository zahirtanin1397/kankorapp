import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator,ToastAndroid } from 'react-native';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Quiz } from '../../src/models';

const ExamHomeScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await DataStore.query(Quiz
      );
      setQuizzes(response);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    const subscription = DataStore.observe(Quiz).subscribe(() => {
      fetchQuizzes();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleQuizPress = ({ id, name, description, grade, isChanging, password,time }) => {
    if (isChanging) {
      navigation.navigate('IsChanging', { id, name, description, grade, password,time });
    } else {
      navigation.navigate('ExamDescription', { id, name, description, grade, password,time });
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleQuizPress({ id: item.id, name: item.name, description: item.description, grade: item.grade, isChanging: item.isChanging, password: item.password, time:item.time })}>
      <View style={styles.quizItem}>
        <Text style={styles.quizTitle}>{item.name}</Text>
        <Text style={styles.quizDescription}>{item.shortdescription}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={fetchQuizzes}
      />
      {refreshing && <ActivityIndicator style={styles.activityIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: '#F5F5F5',
  },
  quizItem: {
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 15,
    borderWidth : 2,
    borderColor : "#110b63",
    backgroundColor  :"#f4f4f5"
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  activityIndicator: {
    marginTop: 16,
  },
  quizDescription: {
    fontSize: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ExamHomeScreen;