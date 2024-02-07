import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Auth } from 'aws-amplify';
import CustomeInpute from '../../../components/Authcomponent/CustomeInput/CustomeInpute';
import CustomeButton from '../../../components/Authcomponent/CustomeButton/CustomeButton';

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const onSendPressed = async () => {
    if (username.trim() === "") {
      ToastAndroid.show("لطفاً ایمیل خود را وارد کنید", ToastAndroid.SHORT);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      ToastAndroid.show("لطفاً یک ایمیل معتبر وارد کنید", ToastAndroid.SHORT);
      return;
    }

    try {
      await Auth.forgotPassword(username);
      ToastAndroid.show("لینک تغییر رمزعبور به ایمیل شما ارسال شد", ToastAndroid.SHORT);
      navigation.navigate("NewPassword");
    } catch (error) {
      Alert.alert("خطا", error.message);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>بازیابی رمزعبور!</Text>

        <CustomeInpute
          placeholder="ایمیل..."
          value={username}
          setValue={setUsername}
        />

        <CustomeButton text="ارسال" onPress={onSendPressed} />

        <CustomeButton text="بازگشت به صفحه ورود" onPress={onSignInPressed} type="TERTIARY" />

      </View>
    </ScrollView>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    marginTop : 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#110b63",
  },
});