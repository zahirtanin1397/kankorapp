import { StyleSheet, Text, View , Pressable} from 'react-native'
import React from 'react';
import {Auth} from "aws-amplify";


const Settings = () => {
  return (
    <View style ={styles.container}>
        <Pressable onPress={() => { Auth.signOut()}}>
        <Text>sign out </Text>
        </Pressable>
    
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    container  :{
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    }
})