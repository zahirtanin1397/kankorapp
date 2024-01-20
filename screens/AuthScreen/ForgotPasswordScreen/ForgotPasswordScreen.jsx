import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import CustomeInpute from '../../../components/Authcomponent/CustomeInput/CustomeInpute';
import CustomeButton from '../../../components/Authcomponent/CustomeButton/CustomeButton';
const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const onSendPressed = async () => {
    try {
      await Auth.forgotPassword(username);
      navigation.navigate("NewPassword");
    } catch (error) {
      Alert.alert("Oops", error.message);
    }
  }

  const onSignInPressed = () => {
    console.warn("signIn");
    navigation.navigate("SignIn");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password!</Text>

        <CustomeInpute
          placeholder="email..."
          value={username}
          setValue={setUsername}
        />

        <CustomeButton text="Send" onPress={onSendPressed} />

        <CustomeButton text="Back to Sign In." onPress={onSignInPressed} type="TERTIARY" />

      </View>
    </ScrollView>
  )
}

export default ForgotPasswordScreen;

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