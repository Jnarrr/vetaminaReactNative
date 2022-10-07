import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import WelcomeScreen from './screens/Welcome';

import TabNavigator from './navs/TabNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="Welcome"
          component={ WelcomeScreen }
          options={{ 
            title: 'Welcome', 
            headerRight: () => (
              <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"></Button>),
          }}
          
        />
        <Stack.Screen name="Login" component={ LoginScreen } options = {{ headerRight: () => (
              <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"></Button>) }} />
        <Stack.Screen name="Register" component={ RegisterScreen } options = {{ headerShown: false }} />
        <Stack.Screen name="Home" component={ TabNavigator } options = {{ 
          headerRight: () => (
              <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"></Button>),
          headerLeft: () => (
            <Button
            onPress={() => alert('This is a button!')}
            title="Profile"
            color="#000"></Button>),
          headerShown: false
              
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;