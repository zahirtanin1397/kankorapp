import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from "@react-navigation/native";
import myLogo from "../../../assets/myLogo.jpg";
import CustomeButton from '../../../components/Authcomponent/CustomeButton/CustomeButton';
import CustomeInpute from '../../../components/Authcomponent/CustomeInput/CustomeInpute';
import React, { useState} from 'react';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onSignInPressed  = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
  
    if (email.trim() === "" || password.trim() === "") {
      ToastAndroid.show("Please enter your email and password", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }
     // Email format validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       ToastAndroid.show('لطفاً یک ایمیل معتبر وارد کنید.', ToastAndroid.SHORT);
       setLoading(false);
       return; // Return early to prevent further execution
     }
  
    try {
      await Auth.signIn(email, password); 
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        Alert.alert('کاربر تأیید نشده است.');
      } else if (error.code === 'NotAuthorizedException') {
        Alert.alert('ایمیل یا رمز عبور اشتباه است.', "ایمل و رمز خود را بررسی کنید");
      } 
    } finally {
      setLoading(false);
    }
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={myLogo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

        <CustomeInpute
        placeholder="ایمیل..."
          value={email}
          setValue={setEmail}
        />

        <CustomeInpute
          placeholder="رمز عبور..."
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomeButton
          text={loading ? "در حال بارگذاری..." : "ورود"}
          onPress={onSignInPressed}
          disabled={loading}
          renderIndicator={() => <ActivityIndicator color="white" />}
        />

        <CustomeButton
          text="فراموشی رمز عبور"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        {/* <SocialSignInButton /> */}

        <CustomeButton
          text="حساب کاربری ندارید؟ ایجاد کنید"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
  )
}

export default SignInScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%",
    height: 100,
    maxWidth: 300,
    maxHeight: 200,
    marginTop : 20,
  },
  email: {
    borderColor: "green",
    borderWidth: 0.5,
    width: "90%",
    height: 50,
    borderRadius: 5,
    margin: 3,
  }
});