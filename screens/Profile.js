import React, { useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';

const ProfileScreen = ( {navigation} ) => {

    const [userdata, setUserData] = useState([]);
    let x = global.id;

    const getUserDetails = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/getUser/${x}`);
        const json = await response.json();
        setUserData(json.customeruser);
        } catch (error) {
        console.error(error);
        }
    }

    useEffect(() => {
        getUserDetails();
      }, []);  

    return(
        <View style = {{ padding: 20 }}>
            <View style = {[styles.box, styles.elevation]}>
                <View style = {styles.profileIcon2}/>
                <Image source = { require('../images/1paw.png')} style = {styles.paw}/>
                <Text style = { styles.boxText }>{userdata.username}</Text>
                <Text style = { styles.boxText2 }>{userdata.email}</Text>
            </View>
            <View style = {styles.whiteBox}>
                <TouchableOpacity style = {{ marginBottom: 25 }} onPress={ () => navigation.navigate('ProfileDetails')}>
                    <Image source = { require('../images/profile.png')} style = {styles.profileIcon}/>
                    <Text style = {{ color: '#181D27', marginLeft: 60, marginTop: -45, fontWeight: 'bold' }}>My Account</Text>
                    <Text style = {{ color: 'gray', marginLeft: 60, marginTop: 3, }}>Make changes to your account</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ marginBottom: 25 }} onPress={ () => navigation.navigate('ChangePassword') }>
                    <Image source = { require('../images/changepw.png')} style = {styles.profileIcon}/>
                    <Text style = {{ color: '#181D27', marginLeft: 60, marginTop: -45, fontWeight: 'bold' }}>Change Password</Text>
                    <Text style = {{ color: 'gray', marginLeft: 60, marginTop: 3, }}>Manage your account password</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.whiteBox2}>
                <TouchableOpacity style = {{ marginBottom: 25 }} onPress={ () => [Alert.alert("You Have been successfully logged out"), navigation.popToTop()] }>
                    <Image source = { require('../images/logout.png')} style = {styles.profileIcon}/>
                    <Text style = {{ color: '#181D27', marginLeft: 60, marginTop: -45, fontWeight: 'bold' }}>Logout</Text>
                    <Text style = {{ color: 'gray', marginLeft: 60, marginTop: 3, }}>Sign out the account</Text>
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
    boxText:{
        color: 'white',
        marginLeft: 20,
        marginTop: -95,
        fontWeight: 'bold',
        fontSize: 16,
    },
    whiteBox:{
        height: 170,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
    },
    whiteBox2:{
        height: 90,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
    },
    boxText2:{
        color: 'white',
        marginLeft: 20,
        fontSize: 14,
    },
    paw:{
        width:200,
        height:200,
        marginTop: -150,
        marginLeft: 120,
    },
    profileIcon:{
        width:50,
        height:50,
    },
    profileIcon2:{
        width:50,
        height:50,
    },
    elevation:{
        elevation: 10,
        shadowColor: '#52006A',
    },
})

export default ProfileScreen;