import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CategoryListScreen from './FormulaListScreen';
import FormulaDetailsScreen from './FormulaDetailsScreen';
const Stack = createStackNavigator();

const FormulaStackNavigation = () => {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator>
        <Stack.Screen name="CategoryList" component={CategoryListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FormulaList" component={FormulaDetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FormulaStackNavigation;