import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const ClinicDetailsScreen = ( {navigation, route} ) => {

    return(
        <View style = { styles.body }>
            <Image source = { require('../images/paw.png')} style = {styles.paw}/>
            <Image source = { require('../images/bone.png')} style = {styles.bone}/>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.goBack()} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <ScrollView style = {styles.whiteBox}>
            <Text style = { styles.header }>{route.params.item.clinic_name}</Text>
            <Image source = { require('../images/pin.png')} style = {styles.pin}/>
            <Text style = { styles.semiHeader }>Address</Text>
            <Text style = { styles.description }>{route.params.item.address}</Text>
            <Image source = { require('../images/email.png')} style = {styles.email}/>
            <Text style = { styles.semiHeader }>Email</Text>
            <Text style = { styles.description }>{route.params.item.email}</Text>
            <Image source = { require('../images/phone.png')} style = {styles.email}/>
            <Text style = { styles.semiHeader }>Phone Number</Text>
            <Text style = { styles.description }>{route.params.item.phone_number}</Text>

            <TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('AppointmentDateAndTime', {clinicID:route.params.item.id, clinicNAME:route.params.item.clinic_name, clinicADDRESS:route.params.item.address}) }>
                <Text style = {styles.btnText}>Appoint now</Text>

            </TouchableOpacity>

            

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
    backgroundColor: 'rgb(109, 169, 22)',
    flex: 1,
    fontFamily: 'Roboto',
    },
    pin:{
    width: 18,
    height: 22,
    },
    email:{
    width: 25,
    height: 22,
    },
    semiHeader:{
    color: 'rgb(73, 80, 74)',
    marginTop: -26,
    marginLeft: 30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    description:{
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    },
    paw: {
    width: 300,
    height: 300,
    marginTop: -40,
    marginLeft: 150,
    },
    bone: {
    width: 120,
    height: 120,
    marginLeft: -40,
    marginTop: -200
    },
    back: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginTop: -150
    },
    whiteBox: {
    width: Dimensions.get('window').width,
    height: 300,
    marginTop: 200,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowOffset: {width: 6, height: 6},
    shadowRadius: 10,
    shadowColor: 'white',
    shadowOpacity: 1,
    backgroundColor: 'white',
    },
    header: {
    fontSize: 30,
    color: 'rgb(80, 140, 2)',
    marginBottom: 30,
    fontWeight: 'bold'
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'rgb(80, 140, 2)',
    color: 'white',
    width: 300,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    },
    petText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
    },
});

export default ClinicDetailsScreen;