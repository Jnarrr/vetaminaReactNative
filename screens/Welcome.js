import React from 'react';
import {View, Button, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const WelcomeScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, alignItems: 'center'}}>
            <Image source = { require('../images/heartLogo.png')} style = {styles.logo}/>
            <Text style = {styles.header}>Book your Appointment Now!</Text>
            <Image source = { require('../images/circlesBG.png')} style = {styles.bg}/>
            <Image source = { require('../images/dogLappy.png')} style = {styles.dog}/>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.navigate('Register')} title='Sign Up' style = { styles.btn }>
                <Text style = { styles.btnText}> Register Now </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.navigate('Login')} title='Login' style = { styles.btn2 }>
                <Text style = { styles.btnText2}> Sign In </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 55,
        height: 55,
        marginTop: 60
    },
    header: {
        color: '#508C02',
        fontWeight: 'bold',
        fontSize: 30,
        width: 250,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 60
    },
    bg: {
        height: 400,
        width: 400,
    },
    dog: {
        height: 400,
        width: 400,
        marginTop: -350,
    },
    btn: {
        backgroundColor: '#508C02',
        borderRadius: 50,
        width: 172,
        height: 50,
        marginTop: -220,
        padding: 15,
    },
    btn2: {
        borderRadius: 50,
        width: 172,
        height: 50,
        padding: 15,
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#508C02'
    },
    btnText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    btnText2: {
        color: '#508C02',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default WelcomeScreen;