import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert , TouchableOpacity, ToastAndroid} from 'react-native';
import { Auth } from 'aws-amplify';
import { User } from '../../src/models';
import { DataStore } from '@aws-amplify/datastore';
import { useRoute, useNavigation } from '@react-navigation/native';

const IsChanging = () => {
  const route = useRoute();
  const [userName, setUserName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const navigation = useNavigation();
  const { id, name , description, grade , password,time } = route.params;

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
  }, []);

  const handlePasswordSubmit = () => {
    if (parseInt(inputPassword) === password) {
      navigation.navigate('ExamDescription', { id, name, description, grade,time });
    } else {
      Alert.alert('رمز عبور اشتباه است', 'رمز عبور وارد شده اشتباه است .');
    }
  };

  return (
    <View style={styles.container}>
      <Text>سلام، {userName} جان</Text>
      <Text style={styles.text}>
        در حال تغییر سوال‌ها هستیم. لطفاً منتظر بمانید تا تست و آماده سازی سوالات آزمون به پایان برسد...
      </Text>
      <TextInput
        style={styles.input}
        placeholder=" رمز عبور را وارد کنید"
        onChangeText={setInputPassword}
        value={inputPassword}
        secureTextEntry
      />
    <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
        <Text style={styles.buttonText}>ارسال</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#110b63',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: '#110b63',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IsChanging;