import * as React from 'react';
import { Text, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/Home';
import PetsScreen from '../screens/Pets';
import AppointmentScreen from '../screens/Appointment';
import AppointmentProcedureScreen from '../screens/AppointmentProcedure';
import MessageScreen from '../screens/Message';
import SearchScreen from '../screens/Search';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? "house"
              : "house";
          } else if (route.name === 'Pets') {
            iconName = focused ? 'star' : 'star';
          }else if (route.name === 'Appointment') {
            iconName = focused ? 'circle' : 'circle';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
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
        }}
        />
        <Tab.Screen 
        name="Pets" 
        component={PetsScreen}
         />
        <Tab.Screen name="Appointment" component={AppointmentScreen} />
        <Tab.Screen name="Message" component={MessageScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
    );
  }

export default TabNavigator;