import React, { useState } from 'react';
import {View, Button, Text, Alert, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';

const ChangePasswordNewScreen = ( {navigation} ) => {
    const [password, setPassword] = useState('');
    const [checkValidPassword, setCheckValidPassword] = useState(false);
    const [isSelected, setSelection] = useState(false);

    let x = global.id;

    const verifyInput = () => {
        if (password.length == 0) {
            Alert.alert("New Password Cannot be Empty")
        } else {
            updatePassword();
        }
    }

    const updatePassword = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/update-customeruser/${x}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                })
            });
            if ((response).status === 201) {
                setPassword('');
            }
        } catch (error) {
        console.error(error);
        } finally {
        Alert.alert('Password Updated!');
        navigation.navigate('Profile');
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
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.goBack(null)} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <ScrollView style = {styles.whiteBox}>
            <Text style = { styles.header }>Change Password</Text>

            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [handleCheckPassword(text), setPassword(text)] }
            placeholder='New Password'
            placeholderTextColor= 'gray'
            secureTextEntry = {true}
            />
            <Image source = { require('../images/password.png')} style = {styles.userIcon}/>
            {
            checkValidPassword ? (
                <Text style = {styles.textFailed}>Password cannot be empty</Text>
                ) : (
                <Text style = {styles.textFailed}> </Text>
            )
            }

            <TouchableOpacity activeOpacity={.6} style = { styles.btn } onPress={ verifyInput }>
                <Text style = {styles.btnText}>Change Password</Text>
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
    marginTop: -150
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
});

export default ChangePasswordNewScreen;