import React from 'react';
import {View, Button, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';

const ProfileScreen = ( {navigation} ) => {
    return(
        <View style = {{ padding: 20 }}>
            <View style = {styles.box}>
                <View style = { styles.profileIcon } />
                <Image source = { require('../images/1paw.png')} style = {styles.paw}/>
                <Text style = { styles.boxText }>{global.username}</Text>
                <Text style = { styles.boxText2 }>{global.email}</Text>
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
                <TouchableOpacity style = {{ marginBottom: 25 }} onPress={ () => [Alert.alert("You Have been successfully logged out"), navigation.popToTop()] }>
                    <Image source = { require('../images/logout.png')} style = {styles.profileIcon}/>
                    <Text style = {{ color: '#181D27', marginLeft: 60, marginTop: -45, fontWeight: 'bold' }}>Logout</Text>
                    <Text style = {{ color: 'gray', marginLeft: 60, marginTop: 3, }}>Sign out the account</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.whiteBox2}>
                <TouchableOpacity style = {{ marginBottom: 35 }} onPress={ () => Alert.alert("Add Feedback") }>
                    <Image source = { require('../images/feedback.png')} style = {styles.profileIcon}/>
                    <Text style = {{ color: '#181D27', marginLeft: 60, marginTop: -35, fontWeight: 'bold' }}>Give App Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{ marginBottom: 35 }} onPress={ () => Alert.alert("About App") }>
                    <Image source = { require('../images/aboutus.png')} style = {styles.profileIcon}/>
                    <Text style = {{ color: '#181D27', marginLeft: 60, marginTop: -35, fontWeight: 'bold' }}>About App</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        width: 320,
        height: 100,
        backgroundColor: '#15D005',
        borderRadius: 5,
        padding: 25,
    },
    boxText:{
        color: 'white',
        marginLeft: 60,
        marginTop: -95,
        fontWeight: 'bold',
        fontSize: 16,
    },
    whiteBox:{
        width: 320,
        height: 240,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
    },
    whiteBox2:{
        width: 320,
        height: 160,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
    },
    boxText2:{
        color: 'white',
        marginLeft: 60,
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
        borderWidth: 2,
        borderRadius: 50,
        borderColor: 'white'
    }
})

export default ProfileScreen;