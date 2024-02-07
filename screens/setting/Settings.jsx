import { StyleSheet, Text, View , TouchableOpacity,ToastAndroid} from 'react-native'
import React from 'react'
import {DataStore} from "@aws-amplify/datastore";
import {  Auth } from 'aws-amplify';

const Settings = () => {
  const handleLogout =  () => {
    try {
      DataStore.clear();
       Auth.signOut();
      ToastAndroid.show('موفقانه خارج شدید', ToastAndroid.SHORT);

    } catch (error) {
      ToastAndroid.show('خروج امکان پذیر نیست', error, ToastAndroid.SHORT);

    }
  };


  return (
    <View style = {styles.container}>
         <TouchableOpacity onPress={handleLogout} style = {styles.signout}>
        <Text>sign out </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
  },
  signout:{
    marginLeft : 10,
    width : 50,
    height : 40,
    backgroundColor : "#110b63",
    justifyContent : "center",
    alignItems : "center",
    borderRadius : 5,
 },
})