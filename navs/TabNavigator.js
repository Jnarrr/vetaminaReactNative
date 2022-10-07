import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import PetsScreen from '../screens/Pets';
import AppointmentScreen from '../screens/Appointment';
import MessageScreen from '../screens/Message';
import SearchScreen from '../screens/Search';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
    <Tab.Navigator>
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
        <Tab.Screen name="Pets" component={PetsScreen} />
        <Tab.Screen name="Appointment" component={AppointmentScreen} />
        <Tab.Screen name="Message" component={MessageScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
    );
  }

export default TabNavigator;