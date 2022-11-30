import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileDetailsScreen = ( {navigation} ) => {
    const [username, setUsername] = useState(global.username);
    const [email, setEmail] = useState(global.email);
    const [phone, setPhone] = useState(global.mobile_number);

    const updateProfile = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/update-profile/${global.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    mobile_number: phone,
                })
            });
            if ((response).status === 201) {
                setUsername('');
                setEmail('');
                setPhone('');
            }
        } catch (error) {
        console.error(error);
        } finally {
        global.username = username
        global.email = email
        global.mobile_number = phone
        console.log(username,email,phone);
        Alert.alert('Profile Information Updated!');
        navigation.navigate('Home');
        }
    }

    return(
        <View style = {{ flex: 1, padding: 30 }}>
            <View style = { styles.square }>
            <Text style = { styles.header }>Edit Profile</Text>

            <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 10}}></View>
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setUsername(text)] }
            placeholder='Enter Username'
            placeholderTextColor= 'gray'
            maxLength={15}
            value = {username}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setEmail(text)] }
            placeholder='Enter Email Address'
            placeholderTextColor= 'gray'
            maxLength={15}
            value = {email}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPhone(text)] }
            placeholder='Enter Phone number (09xxx)'
            placeholderTextColor= 'gray'
            keyboardType='numeric'
            maxLength={11}
            value = {phone}
            />

            <TouchableOpacity style = {styles.btn} onPress = { updateProfile }>
                <Text style = { styles.btnText }>Finish</Text>
            </TouchableOpacity>

            </View>
            
        </View>
    );
};


const styles = StyleSheet.create({
    box:{
        height: 100,
        backgroundColor: '#15D005',
        borderRadius: 5,
        padding: 25,
    },
    square:{
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        borderTopColor: 'green',
        borderTopWidth: 5,
    },
    header: {
        fontSize: 30,
        color: 'rgb(73, 80, 74)',
        fontWeight: 'bold'
    },
    input: {
        padding: 2,
        height: 40,
        marginBottom: 5,
        marginTop: 5,
        borderColor: 'gray',
        borderBottomWidth: 1.5,
        shadowRadius: 10,
        fontSize: 16,
        color: 'black',
    },
    boxText:{
        color: 'white',
        marginLeft: 35,
        marginTop: -95,
        fontWeight: 'bold',
        fontSize: 16,
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
        width: 180,
        height: 35,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
})

export default ProfileDetailsScreen;