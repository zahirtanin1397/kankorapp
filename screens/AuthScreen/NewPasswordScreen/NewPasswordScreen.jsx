import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
// import SocialSignInButton from '../../../../components/Authcomponent/SocialSignInButton/SocialSignInButton';
import CustomeButton from '../../../components/Authcomponent/CustomeButton/CustomeButton';
import CustomeInpute from '../../../components/Authcomponent/CustomeInput/CustomeInpute';

const NewPasswordScreen = () => {

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigation = useNavigation();

  const onSubmitPressed = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Oops", error.message);
    }
  }

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>

        <Text style={styles.title}> تغییر رمزعبور! </Text>

        <CustomeInpute
          placeholder="ایمیل..."
          value={email}
          setValue={setEmail}
        />

        <CustomeInpute
          placeholder="کد..."
          value={code}
          setValue={setCode}
        />

        <CustomeInpute
          placeholder="رمزعبور جدید..."
          value={newPassword}
          setValue={setNewPassword}
        />

        <CustomeButton
          text="تایید"
          onPress={onSubmitPressed}
        />

        <CustomeButton
          text="بازگشت به صفحه ورود"
          onPress={onSignInPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
  )
}

export default NewPasswordScreen;

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
  email: {
    borderColor: "green",
    borderWidth: 0.5,
    width: "90%",
    height: 50,
    borderRadius: 5,
    margin: 3,
  },
  text: {
    marginVertical: 10,
  },
  link: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  }
});