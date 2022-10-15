import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import WelcomeScreen from './screens/Welcome';
import AppointmentProcedureScreen from './screens/AppointmentProcedure';
import AppointmentDateAndTimeScreen from './screens/AppointmentDateAndTime';
import AppointmentSelectPetScreen from './screens/AppointmentSelectPet';

import TabNavigator from './navs/tabNavigator';
import NotificationScreen from './screens/Notifications';
import ClinicDetailsScreen from './screens/ClinicDetails';
import AddPetScreen from './screens/AddPet';

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
        <Stack.Screen name="Login" component={ LoginScreen } options = {{ 
          headerRight: () => (
              <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"></Button>),
              headerShown: false }} />
        <Stack.Screen name="Register" component={ RegisterScreen } options = {{ headerShown: false }} />
        <Stack.Screen name="tabNavigator" component={ TabNavigator } options = {{ 
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
        <Stack.Screen name="AppointmentProcedure" component={ AppointmentProcedureScreen } options = {{ title: 'Select Procedure' }} />
        <Stack.Screen name="AppointmentDateAndTime" component={ AppointmentDateAndTimeScreen } options = {{ title: 'Select Date and Time' }} />
        <Stack.Screen name="AppointmentSelectPet" component={ AppointmentSelectPetScreen } options = {{ title: 'Select Pet' }} />
        <Stack.Screen name="Notifications" component={ NotificationScreen } options = {{ title: 'Notifications' }} />
        <Stack.Screen name="ClinicDetails" component={ ClinicDetailsScreen } options = {{ title: 'Clinic Details' }} />
        <Stack.Screen name="AddPet" component={ AddPetScreen } options = {{ title: 'Add Pet' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;