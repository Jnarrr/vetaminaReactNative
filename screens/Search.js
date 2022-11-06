import React, { useEffect, useState } from 'react';
import {View, Button, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import CoffeeAutonomous from "../components/CoffeeAutonomous";
import RadioButton from '../components/radioBtnCategories';
//import ClinicItem from '../components/clinicContainer';

const SearchScreen = ( {navigation} ) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getClinics = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/clinics2`);
        const json = await response.json();
        setData(json.clinics2);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        getClinics();
    }, []);

    return(
        <View>
            <View style = {{ padding: 30 }}>
                <TextInput style = {styles.input} placeholder = 'Search name of a clinic' placeholderTextColor = 'gray'></TextInput>
                <Image source = { require('../images/search.png')} style = {styles.icon}/>
                <Text style = { styles.header }>Categories</Text>
                <RadioButton/>
                {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    style = {{ height: 550 }}
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                    <TouchableOpacity onPress={ () => navigation.navigate('ClinicDetails', {item:item})}>
                        <Text style = {styles.petText}>{item.clinic_name}, {item.phone_number}, {item.address}</Text>
                    </TouchableOpacity>
                    
                    )}
                />
                )}
                {/*<ScrollView style = {{ height: 450 }}>
                    <TouchableOpacity style = {[styles.box, styles.elevation]} onPress={ () => navigation.navigate('ClinicDetails')}>
                        <Image source = { require('../images/clinicDefault.png')} style = {styles.pic}/>
                        <Text style = {styles.header2}>Domingo Veterinary Clinic</Text>
                    </TouchableOpacity>
    </ScrollView>*/}
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
    header2: {
    fontSize: 16,
    marginTop: -95,
    marginLeft: 110,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
    petText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
        },
})

export default SearchScreen;