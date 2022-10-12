import * as React from 'react';
import { Text, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import PetsScreen from '../screens/Pets';
import AppointmentScreen from '../screens/Appointment';
import AppointmentProcedureScreen from '../screens/AppointmentProcedure';
import MessageScreen from '../screens/Message';
import SearchScreen from '../screens/Search';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
    <Tab.Navigator 
    screenOptions={{ headerTitleAlign: 'center', tabBarShowLabel: false }}
    >
        <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options = {{ 
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
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../images/houseGreen.png')
                  : require('../images/house.png')
              }
              style={{
                width: 22,
                height: 22,
              }}
            />
          ),
          
        }}
        />
        <Tab.Screen 
        name="Pets" 
        component={PetsScreen}
        options={{ 
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../images/petGreen.png')
                  : require('../images/pet.png')
              }
              style={{
                width: 22,
                height: 22,
              }}
            />
          ),
          
         }}
        />
        <Tab.Screen 
        name="Appointment" 
        component={AppointmentScreen} 
        options={{ 
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../images/calendarGreen.png')
                  : require('../images/calendar.png')
              }
              style={{
                width: 22,
                height: 22,
              }}
            />
          ),
          
         }}
        />
        <Tab.Screen 
        name="Message" 
        component={MessageScreen} 
        options={{ 
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../images/chatGreen.png')
                  : require('../images/chat.png')
              }
              style={{
                width: 22,
                height: 22,
              }}
            />
          ),
          
        }}
        />
        <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../images/searchGreen.png')
                  : require('../images/search.png')
              }
              style={{
                width: 22,
                height: 22,
              }}
            />
          ),
          
        }}
        />
    </Tab.Navigator>
    );
  }

export default TabNavigator;