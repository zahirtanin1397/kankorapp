import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth, Hub } from "aws-amplify";
import SignInScreen from "../SignInScreen/SignInScreen";
import SignUpScreen from "../SignUpScreen/SignUpScreen";
import ForgotPasswordScreen from "../ForgotPasswordScreen/ForgotPasswordScreen";
import NewPasswordScreen from "../NewPasswordScreen/NewPasswordScreen";
import ConfirmEmailScreen from "../ConfirmEmailScreen/ConfirmEmailScreen";
import TutorialNavigation from "../../../navigation/TutorialNavigation";
import NetInfo from "@react-native-community/netinfo";
import NotNetWork from "../../NotNetwork/NotNetWork";

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(undefined);
  const [isConnected, setIsConnected] = useState(true);

  const checkUser = async () => {
    try {
      const AuthUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(AuthUser);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    checkUser();

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkUser();
      }
    };

    const removeListener = Hub.listen("auth", listener);
    return () => removeListener();
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!isConnected) {
    return <NotNetWork />;
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen
            name="TutorialNavigation"
            component={TutorialNavigation}
          />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
