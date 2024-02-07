import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity,ToastAndroid } from 'react-native';
import { useRoute,useNavigation  } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import CustomeInpute from '../../../components/Authcomponent/CustomeInput/CustomeInpute';
import CustomeButton from '../../../components/Authcomponent/CustomeButton/CustomeButton';
const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const signUp = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      if (!name) {
        ToastAndroid.show('لطفاً نام را وارد کنید.', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      if (!email) {
        ToastAndroid.show('لطفاً ایمیل را وارد کنید.', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        ToastAndroid.show('لطفاً یک ایمیل معتبر وارد کنید.', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      if (!password) {
        ToastAndroid.show('لطفاً رمز عبور را وارد کنید.', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      if (password !== passwordRepeat) {
        ToastAndroid.show('رمز عبور و تکرار آن یکسان نیستند.', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      const attributes = {
        email,
        name,
      };
      await Auth.signUp({
        username: email,
        password,
        attributes,
      });
        ToastAndroid.show('عضویت با موفقیت انجام شد', ToastAndroid.LONG);
        setLoading(false);
      navigation.navigate("ConfirmEmail");
    } catch (error) {
      if (error.code === "UsernameExistsException") {
        ToastAndroid.show("ایمیلی که وارد کرده‌اید قبلاً استفاده شده است.", ToastAndroid.LONG);
        setLoading(false);
        return;
      } else if (error.code === "InvalidPasswordException") {
        ToastAndroid.show("رمز عبور باید حداقل ۸ رقم داشته باشد.", ToastAndroid.LONG);
        setLoading(false);
        return;
      } else if (error.code === "InvalidParameterException") {
        ToastAndroid.show("خطا در ثبت نام: " + error.message, ToastAndroid.LONG);
        setLoading(false);
        return;
      } else {
        ToastAndroid.show("خطا در ثبت نام: " + error.message, ToastAndroid.LONG);
        setLoading(false);
        return;
      }
    }
  };
  const onSignInPressed = () => {
    console.warn("ورود");
    navigation.navigate("SignIn");
  };

  const onTermUsePressed = () => {
  };

  const onPolicyPressed = () => {
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>حساب کاربری ایجاد کنید!</Text>

        <CustomeInpute
          placeholder="نام..."
          value={name}
          setValue={setName}
        />

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

        <CustomeInpute
          placeholder="تکرار رمز عبور..."
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />

        <CustomeButton 
        text={loading ? "در حال بارگذاری..." : "ثبت نام"}
          onPress={signUp}
        />

        <Text style={styles.text}>
          با ثبت نام، شما تأیید می‌کنید که{' '}
          <Text style={styles.link} onPress={onTermUsePressed}>
            شرایط استفاده
          </Text>{' '}
          و{' '}
          <Text style={styles.link} onPress={onPolicyPressed}>
            سیاست حفظ حریم خصوصی
          </Text>{' '}
          را قبول دارید.
        </Text>

        {/* کامپوننت SocialSignInButton */}
        {/* کد کامپوننت خود را اینجا اضافه کنید */}

        <CustomeButton
          text="حساب کاربری دارید؟ وارد شوید."
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    marginTop : 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#110b63',
  },
  text: {
    marginVertical: 10,
  },
  link: {
    color: '#110b63',
    fontWeight: 'bold',
    fontSize: 16,
  },
});