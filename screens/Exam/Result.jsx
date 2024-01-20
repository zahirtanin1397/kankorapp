import { StyleSheet, Text, View, Pressable, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { User } from "../../src/models";
import { Auth } from "aws-amplify";
import { useRoute, useNavigation } from "@react-navigation/native";

const Result = ({ route }) => {
  const navigation = useNavigation();
  const { examResult } = route.params;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userData = await DataStore.query(User, user.attributes.sub);
        if (userData) {
          setUserName(userData.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserName();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Home');
    return true;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Hello, {userName}!</Text>
      <Text style={styles.resultText}>Exam Result: {examResult}</Text>
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>End</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
});

export default Result;