
import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FacultyStackNavigation from './FacultyInfo/FacultyStackNavigation';
import UniverSityStackNavigation from './UniversityInfo/UniversityStackNavigation';
const Mytap = createMaterialTopTabNavigator();

const UniversityMainScreen = () => {
  return (
 <>
<Mytap.Navigator screenOptions={{
  tabBarItemStyle: { marginTop: 30,width: 200 },
  tabBarScrollEnabled: true,
  tabBarStyle: {tabBarPosition  :'bottom' },

}} 
     
> 
  <Mytap.Screen name="پوهنتون ها" component={UniverSityStackNavigation} />
  <Mytap.Screen name="رشته ها" component={FacultyStackNavigation} />
  
</Mytap.Navigator >

</>
  )
}
export default UniversityMainScreen







