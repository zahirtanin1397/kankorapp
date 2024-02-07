import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Auth } from 'aws-amplify';
import CustomeButton from '../../../components/Authcomponent/CustomeButton/CustomeButton';
import CustomeInpute from '../../../components/Authcomponent/CustomeInput/CustomeInpute';

const NewPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigation = useNavigation();

  const onSubmitPressed = async () => {
    if (email.trim() === "" || code.trim() === "" || newPassword.trim() === "") {
      ToastAndroid.show("لطفاً تمامی فیلدها را پر کنید", ToastAndroid.SHORT);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show("لطفاً یک آدرس ایمیل معتبر وارد کنید", ToastAndroid.SHORT);
      return;
    }

    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      ToastAndroid.show("رمزعبور با موفقیت تغییر کرد", ToastAndroid.SHORT);
      navigation.navigate("SignIn");
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
        <Text style={styles.title}>تغییر رمزعبور!</Text>

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
  );
};

export default NewPasswordScreen;

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