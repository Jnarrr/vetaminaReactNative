import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PetsScreen from './screens/Pets';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pets" component={PetsScreen} />
      </Tab.Navigator>
    );
  }