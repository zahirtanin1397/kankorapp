import { StyleSheet, Text, View, Pressable, BackHandler, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { User } from "../../src/models";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
const Result = ({ route }) => {
  const navigation = useNavigation();
  const { examResult, timeOutDescription } = route.params;
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
        ToastAndroid.show(error, ToastAndroid.SHORT);
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
  const successMessage = "یادتان باشد که هیچ کس در یک روز به موفقیت نرسیده است. موفقیت، نتیجه تلاش‌های پیوسته و پشت سرهم است.";

  return (
    <View style={styles.container}>
        <Text style={styles.greetingText}>سلام، {userName}! به نتیجه آزمون خود خوش آمدید. </Text>

      <Text style ={{color:"#ec6666"}}>{timeOutDescription}</Text>
      <Text style={styles.resultText}>نتیجه آزمون: {examResult}</Text>
      <Text style={styles.successMessage}>{successMessage}</Text>
      <Pressable onPress={() => navigation.navigate("Home")} style ={styles.homeContianer}>
    
        <Text style ={{color : "white"}}>بازگشت به خانه</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#110b63',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ebdddd',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#efebeb',
  },
  homeContianer : {
    marginTop : 150,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default Result;