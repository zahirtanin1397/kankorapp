import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React from 'react'
import CustomeButton from '../CustomeButton/CustomeButton'
const SocialSignInButton = () => {

      const onSIgnInWithFacebook = () => {
        ToastAndroid.show('sign in with facebook', ToastAndroid.SHORT);
      }
    
      const onSIgnInWithGoogle = () => {
        ToastAndroid.show('sign in with google', ToastAndroid.SHORT);
      }
      const onSIgnInWithapple = () => {
        ToastAndroid.show('sign in with apple', ToastAndroid.SHORT);
      }


  return (
    <>
      <CustomeButton  text="sign in with Facebook"
        onPress={onSIgnInWithFacebook} 
        bgcolor="#E7E4Ef"
        fgColor="#4567A9"
        />
      <CustomeButton  text="sign in with google" 
       onPress={onSIgnInWithGoogle}
       bgcolor="#e3e3e3"
       fgColor="#363636"
        />

        <CustomeButton  text="sign in with Apple" 
       onPress={onSIgnInWithapple}
       bgcolor="lightgreen"
       fgColor="#363636"
        />
    </>
  )
}

export default SocialSignInButton

const styles = StyleSheet.create({})