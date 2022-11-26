import * as React from 'react';
import { Text, Image, Button, TouchableOpacity, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import PetsScreen from '../screens/Pets';
import AppointmentScreen from '../screens/Appointment';
import AppointmentProcedureScreen from '../screens/AppointmentProcedure';
import MessageScreen from '../screens/Products';
import SearchScreen from '../screens/Search';
import ProductsScreen from '../screens/Products';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
    return (
    <Tab.Navigator 
    screenOptions={{ headerTitleAlign: 'center', tabBarShowLabel: false }}
    >
        <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options = {{ 
          headerRight: () => (
            <Image source = { require('../images/heartLogo.png')} style = {styles.icon}/>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={ () => navigation.navigate('Profile')} style = {{ marginLeft: 10 }}>
                <Image source = { require('../images/userProfile.png')} style = {styles.userIcon}/>
            </TouchableOpacity>),
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
          headerRight: () => (
            <Image source = { require('../images/heartLogo.png')} style = {styles.icon}/>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={ () => navigation.navigate('Profile')} style = {{ marginLeft: 10 }}>
                <Image source = { require('../images/userProfile.png')} style = {styles.userIcon}/>
            </TouchableOpacity>),
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
          headerRight: () => (
            <Image source = { require('../images/heartLogo.png')} style = {styles.icon}/>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={ () => navigation.navigate('Profile')} style = {{ marginLeft: 10 }}>
                <Image source = { require('../images/userProfile.png')} style = {styles.userIcon}/>
            </TouchableOpacity>),
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
        name="Products" 
        component={ProductsScreen} 
        options={{ 
          headerRight: () => (
            <Image source = { require('../images/heartLogo.png')} style = {styles.icon}/>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={ () => navigation.navigate('Profile')} style = {{ marginLeft: 10 }}>
                <Image source = { require('../images/userProfile.png')} style = {styles.userIcon}/>
            </TouchableOpacity>),
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require('../images/productsGreen.png')
                  : require('../images/products.png')
              }
              style={{
                width: 28,
                height: 14,
              }}
            />
          ),
          
        }}
        />
        <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          headerRight: () => (
            <Image source = { require('../images/heartLogo.png')} style = {styles.icon}/>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={ () => navigation.navigate('Profile')} style = {{ marginLeft: 10 }}>
                <Image source = { require('../images/userProfile.png')} style = {styles.userIcon}/>
            </TouchableOpacity>),
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
          )
          
        }}
        />
    </Tab.Navigator>
    );
  }

const styles = StyleSheet.create({
  icon: {
  width:30,
  height:30,
  marginRight: 20,
  },
  profileIcon: {
  width:40,
  height:40,
  borderWidth: 1,
  borderRadius: 50
  },
  userIcon: {
  width:25,
  height:32,
  marginLeft: 10
  }
});

export default TabNavigator;