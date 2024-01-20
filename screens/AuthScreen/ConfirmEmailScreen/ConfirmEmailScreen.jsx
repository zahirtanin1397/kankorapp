import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import CustomeButton from '../../../components/Authcomponent/CustomeButton/CustomeButton';
import CustomeInpute from '../../../components/Authcomponent/CustomeInput/CustomeInpute';
const ConfirmEmailScreen = () => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const onConfirmPressed = async () => {
    try {
       await Auth.confirmSignUp(username, code);
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Oops", error.message);
    }
  };



  const onSignInPressed = () => {
    console.warn("signIn");
    navigation.navigate("SignIn");
  };

  const onResendcodePressed = async() => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("Success ", "code was resend to your email!");
   } catch (error) {
     Alert.alert("Oops", error.message);
   }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email!</Text>

        <CustomeInpute
          placeholder="Enter your email..."
          value={username}
          setValue={setUsername}
        />

        <CustomeInpute
          placeholder="Please enter your confirmation code..."
          value={code}
          setValue={setCode}
        />

        <CustomeButton text="Confirm" onPress={onConfirmPressed} />

        <CustomeButton text="Resend code" onPress={onResendcodePressed} type="SECONDARY" />

        <CustomeButton text="Back to Sign In." onPress={onSignInPressed} type="TERTIARY" />
      </View>
    </ScrollView>
  )
}

export default ConfirmEmailScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
});