import React, { useState, useRef, useEffect } from 'react';
import {View, Dimensions, Text, Alert, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard} from 'react-native';

const OtpScreen = ( {navigation} ) => {
    const [otp, setOtp] = useState('');
    const [isSelected, setSelection] = useState(false);

    return(
        <View style = { styles.body }>
            <Image source = { require('../images/paw.png')} style = {styles.paw}/>
            <Image source = { require('../images/bone.png')} style = {styles.bone}/>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.navigate('Welcome')} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

                
            <KeyboardAvoidingView style={styles.whiteBox}>
            <ScrollView>
            <Text style = { styles.header }>Verify Email</Text>

            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setOtp(text)] }
            placeholder='Enter Otp'
            placeholderTextColor= 'gray'
            maxLength={6} 
            keyboardType='numeric'
            />
            <Image source = { require('../images/password.png')} style = {styles.userIcon}/>


            <TouchableOpacity activeOpacity={.6} style = { styles.btn } onPress={ () => navigation.navigate('Login')}>
                <Text style = {styles.btnText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <Text style = {styles.btnText2}></Text>
            </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
            <View style = {{ backgroundColor: 'white', 
            width: Dimensions.get('window').width,
            height: 300, }}>

            </View>

            
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
    marginTop: -150
    },
    whiteBox: {
    width: Dimensions.get('window').width,
    height: 280,
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
    marginBottom: 10,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 20,
    color: 'black',
    alignSelf: 'center'
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
});

export default OtpScreen;