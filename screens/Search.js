import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, TextInput, Image, ScrollView} from 'react-native';
import CoffeeAutonomous from "../components/CoffeeAutonomous";
import RadioButton from '../components/radioBtnCategories';
import ClinicItem from '../components/clinicContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                    <ClinicItem />
                    <ClinicItem />
                    <ClinicItem />
                    <ClinicItem />
                    <ClinicItem />
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
})

export default SearchScreen;