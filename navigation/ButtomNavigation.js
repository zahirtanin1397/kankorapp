import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons';
import FormulaStackNavigation from "../screens/FurmolaInfo/FormulaStackNavigation";
import BookScreen from "../screens/BookScreen";
import TutorialCategoryScreen from "../screens/TutorialCategoryScreen";
import ExamHomeScreen from "../screens/Exam/ExamHomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createMaterialBottomTabNavigator();
function ButtomNavigation() {
  return ( 
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="black"
    inactiveColor="gray"
    barStyle={{ backgroundColor: 'white', height : 65,borderTopWidth :0.4,
    paddingTop : 0, 
   }}>
      <Tab.Screen
        name="کتاب خانه"
        component={BookScreen}
        options={{
          tabBarIcon: () => (
            <Entypo name="book" size={20} color="gray" />
          ),
        }}
      />
      <Tab.Screen
        name="آموزش ها"
        component={TutorialCategoryScreen}
        options={{
          tabBarIcon: () => (
            <Entypo name="folder-video" size={20} color="gray" />
          ),
        }}
      />
      <Tab.Screen
        name="امتحان"
        component={ExamHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
<AntDesign name="questioncircle" size={20} color="gray" />          ),
        }}
      />
      <Tab.Screen
        name="فرمول"
        component={FormulaStackNavigation}
        options={{
          tabBarIcon: () => (
 <MaterialCommunityIcons name="math-integral-box" size={20} color="gray" />           ),
        }}
      />
    </Tab.Navigator>
   );
}
export default ButtomNavigation;
