import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity} from 'react-native';
import CoffeeAutonomous from "../components/CoffeeAutonomous";
import RadioButton from '../components/radioBtnCategories';
//import ClinicItem from '../components/clinicContainer';

const SearchScreen = ( {navigation} ) => {
    const data = [
        { value: 'Nearby' },
        { value: 'Popular' },
        { value: 'Last Visited' },
    ];

    return(
        <View>
            <View style = {{ padding: 30 }}>
                <TextInput style = {styles.input} placeholder = 'Search name of a clinic' placeholderTextColor = 'gray'></TextInput>
                <Image source = { require('../images/search.png')} style = {styles.icon}/>
                <Text style = { styles.header }>Categories</Text>
                <RadioButton data = {data} />
                <ScrollView style = {{ height: 450 }}>
                    <TouchableOpacity style = {[styles.box, styles.elevation]} onPress={ () => navigation.navigate('ClinicDetails')}>
                        <Image source = { require('../images/clinicDefault.png')} style = {styles.pic}/>
                        <Text style = {styles.header}>Domingo Veterinary Clinic</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
    padding: 2,
    width: 290,
    height: 40,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    shadowRadius: 10,
    fontSize: 14,
    textAlign:'center',
    color: 'black',
    },
    icon: {
    width:20,
    height:20,
    marginLeft: 255,
    marginTop: -30
    },
    header: {
    fontSize: 30,
    marginTop: 30,
    marginLeft: -15,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
    elevation:{
    elevation: 20,
    shadowColor: '#52006A',
    },
    box: {
    marginTop: 20,
    width: 300,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    },
    pic: {
    width: 100,
    height: 100,
    borderRadius: 10,
    },
    header: {
    fontSize: 16,
    marginTop: -95,
    marginLeft: 110,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
})

export default SearchScreen;