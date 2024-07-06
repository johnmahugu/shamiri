import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screens/HomeScreen';
import JournalScreen from '../screens/Journal/JournalScreen';
import AddEntryScreen from '../screens/Journal/AddEntryScreen';
import EditEntryScreen from '../screens/Journal/EditEntryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} />
        <Stack.Screen name="EditEntry" component={EditEntryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
