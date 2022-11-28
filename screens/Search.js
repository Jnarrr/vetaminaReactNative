import React, { useEffect, useState } from 'react';
import {View, Button, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import CoffeeAutonomous from "../components/CoffeeAutonomous";
import RadioButton from '../components/radioBtnCategories';
//import ClinicItem from '../components/clinicContainer';

const SearchScreen = ( {navigation} ) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

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
                <TextInput 
                style = {styles.input} 
                placeholder = 'Search name of a clinic' 
                placeholderTextColor = 'gray'
                onChangeText = { (text) => setSearch(text) }
                >
                </TextInput>
                <Image source = { require('../images/search.png')} style = {styles.icon}/>
                <Text style = { styles.header }>Clinics</Text>
                {/*<RadioButton/>*/}
                {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    style = {{ height: 450 }}
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                    <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('ClinicDetails', {item:item})}>
                        <Text style = {styles.header2}>{item.clinic_name}</Text>
                        <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 3}}/>
                        <Image source = { require('../images/clock.png')} style = {styles.clock}/>
                        <Text style = {styles.description2}>{item.owner_name}</Text>
                        <Image source = { require('../images/pin.png')} style = {styles.pin}/>
                        <Text style = {styles.description2}>{item.address}</Text>
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
    clock: {
    width:18,
    height:18,
    marginTop:5
    },
    pin: {
    width:15,
    height:18,
    marginTop:10
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
    item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    height: 120,
    borderTopColor: 'green',
    borderTopWidth: 3
    },
    pic: {
    width: 100,
    height: 100,
    borderRadius: 10,
    },
    header2: {
    fontSize: 22,
    color: 'rgb(80, 140, 2)',
    fontWeight: 'bold'
    },
    description2: {
    fontSize: 16,
    color: 'black',
    marginTop: -20,
    marginLeft: 22
    },
})

export default SearchScreen;