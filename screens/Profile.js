import React from 'react';
import {View, Button, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';

const ProfileScreen = ( {navigation} ) => {
    return(
        <View  style = {{ padding: 30 }}>
            <View style = {styles.box}>
                <View style = { styles.profileIcon } />
                <Image source = { require('../images/1paw.png')} style = {styles.paw}/>
                <Text style = { styles.boxText }>{global.username}</Text>
                <Text style = { styles.boxText2 }>{global.email}</Text>
            </View>
            <TouchableOpacity style = {styles.box} onPress={ () => [Alert.alert("You Have been successfully logged out"), navigation.popToTop()] }>
                <Text style = {{ color: 'red' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        width: 300,
        height: 100,
        backgroundColor: '#15D005',
        borderRadius: 10,
        padding: 25,
    },
    boxText:{
        color: 'white',
        marginLeft: 60,
        marginTop: -95,
        fontWeight: 'bold',
        fontSize: 16,
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
        marginLeft: 100,
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