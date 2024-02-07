import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Auth } from 'aws-amplify';
import CustomeButton from '../../../components/Authcomponent/CustomeButton/CustomeButton';
import CustomeInpute from '../../../components/Authcomponent/CustomeInput/CustomeInpute';

const ConfirmEmailScreen = () => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const onConfirmPressed = async () => {
    if (code.trim() === "" || username.trim() === "") {
      ToastAndroid.show("لطفاً کد تأیید و ایمیل خود را وارد کنید", ToastAndroid.SHORT);
      return;
    }

    try {
      await Auth.confirmSignUp(username, code);
      ToastAndroid.show("ایمیل شما تأیید شد", ToastAndroid.SHORT);
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("خطا", error.message);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  const onResendcodePressed = async() => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("موفقیت", "کد مجدداً به ایمیل شما ارسال شد!");
   } catch (error) {
     Alert.alert("خطا", error.message);
   }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>تأیید ایمیل!</Text>

        <CustomeInpute
          placeholder="ایمیل خود را وارد کنید..."
          value={username}
          setValue={setUsername}
        />

        <CustomeInpute
          placeholder="لطفاً کد تأیید را وارد کنید..."
          value={code}
          setValue={setCode}
        />

        <CustomeButton text="تأیید" onPress={onConfirmPressed} />

        <CustomeButton text="ارسال مجدد کد" onPress={onResendcodePressed} type="SECONDARY" />

        <CustomeButton text="بازگشت به صفحه ورود" onPress={onSignInPressed} type="TERTIARY" />
      </View>
    </ScrollView>
  );
}

export default ConfirmEmailScreen;

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