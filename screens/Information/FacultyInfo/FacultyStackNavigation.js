import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FacultyDetailsScreen from './FacultyDetailsScreen';
import FacultyListScreen from './FacultyListScreen';

const Stack = createStackNavigator();

const FacultyStackNavigation  = () => {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator>
        <Stack.Screen name="FacultyListScreen" component={FacultyListScreen} options={{headerShown : false}} />
        <Stack.Screen name="FacultyDetailsScreen" component={FacultyDetailsScreen}  options={{headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FacultyStackNavigation;