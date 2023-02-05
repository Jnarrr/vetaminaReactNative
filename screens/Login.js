import React, { useState, useRef, useEffect } from 'react';
import {View, Dimensions, Text, Alert, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const LoginScreen = ( {navigation} ) => {
    const [email, setEmail] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [checkValidPassword, setCheckValidPassword] = useState(false);
    const [isSelected, setSelection] = useState(false);

    const verifyLogin = async () => {
        await fetch('http://localhost:8000/api/customerlogin', {
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'email':email, 'password':password})
        }).then(res => res.json())
        .then(resData =>{
          if ("error" in resData) {
            Alert.alert('Error', 'Incorrect Email or Password')
          } else if ("notVerified" in resData){
            Alert.alert('Error', 'Your email is not yet Verified, We sent an OTP code in your mail, Please check your Inbox')
            global.email = email
            navigation.navigate('Otp')
          } else {
            //console.log(resData)
            global.id = resData.id
            global.username = resData.username
            global.password = resData.password
            global.birthdate = resData.birthdate
            global.email = resData.email
            global.mobile_number = resData.mobile_number
            navigation.navigate('tabNavigator')
          }
        })
    }

    const handleCheckEmail = text => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmail(text)
        if(regex.test(text)){
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    }

    const handleCheckPassword = text => {
        if (text.length < 1){
            setCheckValidPassword(true);
        }else{
            setCheckValidPassword(false);
        }
    }

    return(
        <View style = { styles.body }>
            <Image source = { require('../images/paw.png')} style = {styles.paw}/>
            <Image source = { require('../images/bone.png')} style = {styles.bone}/>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.navigate('Welcome')} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

                
            <KeyboardAvoidingView style={styles.whiteBox}>
            <ScrollView>
            <Text style = { styles.header }>Login</Text>

            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [handleCheckEmail(text), setEmail(text)] }
            placeholder='Enter Email'
            placeholderTextColor= 'gray'
            maxLength={50} 
            />
            <Image source = { require('../images/email.png')} style = {styles.email}/>
            {
            checkValidEmail ? (
                <Text style = {styles.textFailed}>Invalid Email format</Text>
                ) : (
                <Text style = {styles.textFailed}> </Text>
            )
            }


            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [handleCheckPassword(text), setPassword(text)] }
            placeholder='Enter Password'
            placeholderTextColor= 'gray'
            maxLength={15} 
            secureTextEntry
            />
            <Image source = { require('../images/password.png')} style = {styles.userIcon}/>
            {
            checkValidPassword ? (
                <Text style = {styles.textFailed}>Password cannot be empty</Text>
                ) : (
                <Text style = {styles.textFailed}> </Text>
            )
            }

            <TouchableOpacity activeOpacity={.6} style = { styles.btn } onPress={ verifyLogin }>
                <Text style = {styles.btnText}>Login</Text>
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
    email: {
    width:25,
    height:20,
    marginLeft: 295,
    marginTop: -35
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

export default LoginScreen;