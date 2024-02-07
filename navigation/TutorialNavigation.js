import { useNavigation,} from "@react-navigation/native";
import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable, ToastAndroid, TouchableOpacity
} from "react-native";
import {
  Feather,
} from "@expo/vector-icons";
import myLogo from "../assets/myLogo.jpg";
import {DataStore} from "@aws-amplify/datastore";
import {  Auth } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import EpisodeScreen from '../screens/EpisodeScreen';
import ExamDescription from '../screens/Exam/ExamDescription';
import ButtomNavigation from './ButtomNavigation';
import BookScreen from '../screens/BookScreen';
import QuestionCodeScreen from '../screens/Exam/QuestionCodeScreen';
import Result from '../screens/Exam/Result';
import IsChanging from '../screens/Exam/IsChanging';
import ReplyScreen from "../screens/postScreen/ReplyScreen";
import HomeScreenPost from "../screens/postScreen/HomeScreenPost";
import CommentScreen from "../screens/postScreen/CommentScreen";
import FormulaStackNavigation from "../screens/Information/UniversityMainScreen";
import Settings from "../screens/Setting/Settings";
import EditCommentScreen from "../screens/postScreen/EditCommentScreen";
import EditReplayScreen from "../screens/postScreen/EditReplayScreen";
const Stack = createStackNavigator();

export default function TutorialNavigation() {


  return (
    <NavigationContainer independent = {true} >
    <Stack.Navigator >
      <Stack.Screen name="Home" component={ButtomNavigation}
              options={{ headerTitle: (props) => <HomeHeader {...props} />, 
             headerStyle  : { height : 70, shadowOpacity : 0.1,elevation : 1}
            }}
      />

      <Stack.Screen
        name="ReplyScreen"
        component={ReplyScreen}
        options={{ headerTitle:  "پاسخ" }}
      />
       <Stack.Screen
        name="EditCommentScreen"
        component={EditCommentScreen}
        options={{ headerTitle:  "ویرایش" }}
      />
        <Stack.Screen
        name="EditReplayScreen"
        component={EditReplayScreen}
        options={{ headerTitle:  "ویرایش" }}
      />
       <Stack.Screen
        name="HomeScreenPost"
        component={HomeScreenPost}
        options={{ title : "پست" }}
      />
    <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{ title : "نظریات" }}
      />

{/*  */}
      <Stack.Screen name="EpisodeScreen" component={EpisodeScreen} 
         options={{
          headerShown : false,
         }}
      />
         <Stack.Screen name="ExamDescription" component={ExamDescription} 
         options={{
          headerShown : false,
         }}
      />
         <Stack.Screen name="QuestionCodeScreen" component={QuestionCodeScreen} 
         options={{
          headerShown : false,
         }}
      />
         <Stack.Screen name="Result" component={Result} 
         options={{
          headerShown : false,
         }}
      />
          <Stack.Screen name="BookScreen" component={BookScreen} 
         options={{
          headerShown : false,
         }}
      />
             <Stack.Screen name="IsChanging" component={IsChanging} 
         options={{
          headerShown : false,
         }}
      />
               <Stack.Screen name="FormulaStackNavigation" component={FormulaStackNavigation} 
         options={{
          headerShown : false,
         }}
      />

        <Stack.Screen name="Settings" component={Settings} 
         options={{
          headerShown : false,
         }}
      />

    </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeHeader = (props) => {


   const navigation = useNavigation();
 
   return (
     <View style={styles.headerShow}>
       <Image
         source={myLogo}
         style={{ width: 32, height: 32 }}
       />
     <Text style ={styles.myappname}> سلام وطن دار </Text>
       <View style={styles.tools}>
       <Pressable onPress={()=> navigation.navigate("FormulaStackNavigation")}>
       <Ionicons name="information-circle-outline" size={27} color="gray" />
         </Pressable>
         <Pressable onPress={()=> navigation.navigate("HomeScreenPost")}>
         <Ionicons name="chatbubble-ellipses-outline" size={24} color="gray"
            style = {{marginLeft : 20,}}
         />
         </Pressable>
        <Pressable onPress={() => {navigation.navigate("Settings")}}>
        <Feather name="settings" size={22} color="gray"  style = {{marginLeft : 20,}} />
        </Pressable>
      
       </View>
     </View>
   );
 };
 

 const styles = StyleSheet.create({
   headerShow: {
     flexDirection: "row",
     justifyContent: "space-between",
     marginHorizontal: 5,
     alignItems : "center",
   },
   tools: {
     flexDirection: "row",
     justifyContent: "space-around",
     marginLeft: 50,
     alignItems : "center",
   
   },
   HomeText: {
     marginLeft: 40,
     fontSize: 20,
     fontWeight: "bold",
   },
 
   chatheaderShow: {
     flexDirection: "row",
     justifyContent: "space-between",
     marginHorizontal: -16,
     alignItems : "center",
   },
   chatNameText: {
     marginLeft: 10,
     fontSize: 16,
   },
   cahttools: {
     flexDirection: "row",
     justifyContent: "space-between",
     marginLeft: 70,
   },
   signout:{
      marginLeft : 10,
      width : 50,
      height : 40,
      backgroundColor : "green",
      justifyContent : "center",
      alignItems : "center",
      borderRadius : 5,
   },
   myappname:{
      color : "#054405",
      fontSize : 20,
      fontWeight : "bold",
   }
 });
 
