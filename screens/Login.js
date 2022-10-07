import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, TextInput} from 'react-native';

const LoginScreen = ( {navigation} ) => {
    const [username, setUsername] = useState('');
    const [checkValidUsername, setCheckValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [checkValidPassword, setCheckValidPassword] = useState(false);

    const handleCheckUsername = text => {
        if (text.length < 8){
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
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Login View</Text>
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [handleCheckUsername(text), setUsername(text)] }
            placeholder='Enter Username'
            placeholderTextColor= 'gray'
            maxLength={15} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [handleCheckPassword(text), setPassword(text)] }
            placeholder='Enter Password'
            placeholderTextColor= 'gray'
            maxLength={15} 
            secureTextEntry = {true}
            />

            <Button onPress={ () => navigation.navigate('Home')} title='Login'></Button>
            <Button onPress={ () => navigation.navigate('Register')} title='Register'></Button>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default LoginScreen;