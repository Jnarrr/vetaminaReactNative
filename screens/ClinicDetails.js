import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const ClinicDetailsScreen = ( {navigation, route} ) => {
    const [username, setUsername] = useState('');
    const [checkValidUsername, setCheckValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [checkValidPassword, setCheckValidPassword] = useState(false);
    const [isSelected, setSelection] = useState(false);

    const handleCheckUsername = text => {
        if (text.length < 1){
            setCheckValidUsername(true);
        }else{
            setCheckValidUsername(false);
        }
    }

    const handleCheckPassword = text => {
        if (text.length < 8){
            setCheckValidPassword(true);
        }else{
            setCheckValidPassword(false);
        }
    }

    return(
        <View style = { styles.body }>
            <TouchableOpacity onPress={ () => navigation.goBack(null)}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <ScrollView style = {styles.whiteBox}>
            <Text style = { styles.header }>{route.params.item.clinic_name}</Text>
            <Text style = { styles.petText }>ID: {route.params.item.id}</Text>
            <Text style = { styles.petText }>{route.params.item.phone_number}</Text>
            <Text style = { styles.petText }>{route.params.item.address}</Text>
            <Text style = { styles.petText }>{route.params.item.email}</Text>

            <TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('AppointmentDateAndTime', {clinicID:route.params.item.id}) }>
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
    userIcon: {
    width:20,
    height:20,
    marginLeft: 300,
    marginTop: -35
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
    marginTop: 30
    },
    whiteBox: {
    width: 360,
    height: 300,
    marginTop: 200,
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
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 30,
    fontWeight: 'bold'
    },
    input: {
    padding: 2,
    width: 300,
    height: 40,
    marginLeft: 30,
    marginBottom: 10,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 20,
    color: 'black',
    },
    textFailed: {
    color: 'red',
    marginLeft: 30,
    marginTop: 10,
    },
    checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    },
    checkbox: {
    marginLeft: 30,
    },
    label: {
    marginLeft: 60,
    marginTop: -25,
    fontSize: 14,
    color: 'gray',
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btnText2:{
    color: 'green',
    fontSize: 14,
    padding: 8,
    marginTop: 10,
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