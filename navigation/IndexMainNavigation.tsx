// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
//   useNavigation,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import * as React from "react";
// import {
//   ColorSchemeName,
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   Pressable
// } from "react-native";
// import {
//   Feather,
  
// } from "@expo/vector-icons";
// import NotFoundScreen from "../screens/NotFoundScreen";
// import {
//   RootStackParamList,
//   RootTabParamList,
//   RootTabScreenProps,
// } from "../types";
// import LinkingConfiguration from "./LinkingConfiguration";

// // custome
// import ChatRoomScreen from "../screens/ChatRoomScreen";
// import HomeScreen from "../screens/HomeScreen";
// import UserScreen from "../screens/UserScreen";
// import TutorialCategoryScreen from "../screens/TutorialCategoryScreen";
// import EpisodeScreen from "../screens/EpisodeScreen";
// import ButtomNavigation from "./ButtomNavigation";
// import ExamHomeScreen from "../screens/Exam/ExamHomeScreen";
// import ExamDescription from "../screens/Exam/ExamDescription";

// export default function MyNavigation({
//   colorScheme,
// }: {
//   colorScheme: ColorSchemeName;
// }) {
//   return (
//     <NavigationContainer  independent = {true}
//       linking={LinkingConfiguration}
//       theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//     >
//       <RootNavigator />
//     </NavigationContainer>
//   );
// }

// const Stack = createNativeStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   return (
//     <Stack.Navigator >
//        <Stack.Screen
//         name="ButtomTabNavigation"
//         component={ButtomNavigation}
//         options={{
//           headerShown : false,
//          }}
//       />
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerTitle: (props) => <HomeHeader {...props} /> }}
//       />
//       <Stack.Screen
//         name="ChatRoom"
//         component={ChatRoomScreen}
//         options={{ headerTitle: ChatRoomHeader }}
//       />
//        <Stack.Screen
//         name="UserScreen"
//         component={UserScreen}
//         options={{ title : "Users" }}
//       />

//      {/* <Stack.Screen
//         name="TutorialCategoryScreen"
//         component={TutorialCategoryScreen}
//         options={{ title : "Users" }}
//       /> */}
// {/* 
// <Stack.Screen
//         name="Episode "
//         component={EpisodeScreen}
//         options={{ title : "Users" }}
//       />
//       <Stack.Screen name="NotFound" component={NotFoundScreen} />
//       <Stack.Screen name="ExamHomeScreen" component={ExamHomeScreen} />
//       <Stack.Screen name="ExamDescription" component={ExamDescription} /> */}


//     </Stack.Navigator>
//   );
// }

// const HomeHeader = (props) => {

//   const navigation = useNavigation();

//   return (
//     <View style={styles.headerShow}>
//       <Image
//         source={{
//           uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
//         }}
//         style={{ width: 35, height: 35, borderRadius: 50 }}
//       />
//       <Text style={styles.HomeText}>Home </Text>
//       <View style={styles.tools}>
//         <Feather name="camera" size={23} color="#979595" />
//         <Pressable onPress={()=> navigation.navigate("UserScreen")}>
//         <Feather
//           name="edit-2"
//           size={23}
//           color="#a19f9f"
//           style={{ marginLeft: 20 }}
//         />
//         </Pressable>
     
//       </View>
//     </View>
//   );
// };

// const ChatRoomHeader = (props) => {
//   return (
//     <View style={styles.chatheaderShow}>
//       <Image
//         source={{
//           uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
//         }}
//         style={{ width: 40, height: 40, borderRadius: 50 }}
//       />
//       <Text style={styles.chatNameText}>{props.children} </Text>
//       <View style={styles.cahttools}>
//         <Feather name="camera" size={23} color="#9d9a9a" />
//         <Feather
//           name="edit-2"
//           size={23}
//           color="#8e8989"
//           style={{ marginLeft: 20 }}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerShow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 5,
//     alignItems : "center",
//   },
//   tools: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginLeft: 70,
  
//   },
//   HomeText: {
//     marginLeft: 90,
//     fontSize: 20,
//     fontWeight: "bold",
//     // marginTop : 100,
//   },

//   chatheaderShow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: -16,
//     alignItems : "center",
//   },
//   chatNameText: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   cahttools: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginLeft: 70,
//   },
// });
