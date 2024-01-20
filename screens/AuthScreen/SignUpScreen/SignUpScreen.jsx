import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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
  const route = useRoute();
  const navigation = useNavigation();

  const signUp = async () => {
    try {
      if (!password) {
        throw new Error('رمز عبور الزامی است.');
      }

      const attributes = {
        email, // از متغیر state email به طور مستقیم استفاده می‌کنیم
        name, // از متغیر state name به طور مستقیم استفاده می‌کنیم

      };

      await Auth.signUp({
        username: email, // از ایمیل به عنوان نام کاربری استفاده می‌کنیم
        password,
        attributes,
      });

      console.log('عضویت با موفقیت انجام شد');
      navigation.navigate("ConfirmEmail");
    } catch (error) {
      console.log('خطا در ثبت نام:', error);
      // با خطا برخورد کرده و پیام مناسبی را به کاربر نشان می‌دهیم
      if (error.message === 'رمز عبور الزامی است.') {
        console.log('لطفاً رمز عبور را وارد کنید.');
      } else {
        console.log('خطای غیرمنتظره‌ای رخ داده است. لطفاً دوباره تلاش کنید.');
      }
    }
  };

  const onSignInPressed = () => {
    console.warn("ورود");
    navigation.navigate("SignIn");
  };

  const onTermUsePressed = () => {
    console.warn("شرایط استفاده");
  };

  const onPolicyPressed = () => {
    console.warn("سیاست حفظ حریم خصوصی");
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

        <CustomeButton text="ثبت نام"
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
    marginTop : 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  text: {
    marginVertical: 10,
  },
  link: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
});