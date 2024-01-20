import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import UniversityList from './UniversityListScreen';
import UniversityDetails from './UniversityDetailsScreen';

const Stack = createStackNavigator();

const UniverSityStackNavigation  = () => {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator>
        <Stack.Screen name="UniversityList" component={UniversityList} options={{headerShown : false}} />
        <Stack.Screen name="UniversityDetails" component={UniversityDetails}  options={{headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UniverSityStackNavigation;