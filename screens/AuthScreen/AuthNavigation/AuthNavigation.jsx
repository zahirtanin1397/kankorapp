import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
  ToastAndroid,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Auth, Hub } from "aws-amplify";
import SignInScreen from "../SignInScreen/SignInScreen";
import SignUpScreen from "../SignUpScreen/SignUpScreen";
import ForgotPasswordScreen from "../ForgotPasswordScreen/ForgotPasswordScreen";
import NewPasswordScreen from "../NewPasswordScreen/NewPasswordScreen";
import ConfirmEmailScreen from "../ConfirmEmailScreen/ConfirmEmailScreen";
import TutorialNavigation from "../../../navigation/TutorialNavigation";
import NetInfo from '@react-native-community/netinfo';
import NotNetworkConnection from "../NotNetworkConnection";

const AuthNavigation = () => {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(undefined);
  const [isConnected, setIsConnected] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    checkUser(); // Check user authentication status
    return () => { unsubscribe();};},[]);

  const checkUser = async () => {
    try {
      const AuthUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setUser(AuthUser);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const handleAuthEvent = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };

    const removeAuthListener = Hub.listen("auth", handleAuthEvent);

    return () => {
      removeAuthListener();
    };
  }, []);

  useEffect(() => {
    setIsFirstTime(false);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      setIsFirstTime(true);
    }
  }, [isConnected]);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime && !isConnected && (
          <Stack.Screen
            name="NotNetWorkConnection"
            component={NotNetworkConnection}
          />
        )}
        {user ? (
          <Stack.Screen
            name="TutorialNavigation"
            component={TutorialNavigation}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});