import React, { useState, useEffect } from 'react';
import {View, Button, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const ClinicDetailsScreen = ( {navigation, route} ) => {

    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [servicedata, setServiceData] = useState([]);
    const [productdata, setProductData] = useState([]);

    const getServices = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/services/${route.params.item.id}`);
        const json = await response.json();
        setServiceData(json.services);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getProducts = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/products/${route.params.item.id}`);
        const json = await response.json();
        setProductData(json.products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading2(false);
        }
    }

    const showServices = () => {
        while(isLoading){
            return (<ActivityIndicator size="large" color="green"></ActivityIndicator>);
        }
        if ( servicedata.length == 0 ) {
            return (
                <Text style = {{ fontSize: 20, color: 'gray', justifyContent: 'center', textAlign: 'center', marginTop: 25, marginBottom: 25 }}> No Available Services :{'('}</Text>
            )
        } else {
            return (
            <FlatList
                style = {{ marginLeft: 30, height: 150 }}
                data={servicedata}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <View>
                    <Text style = {styles.description}>{item.service_name}</Text>
                    <Text style = {styles.description2}>₱ {item.service_price}</Text>
                </View>
                )}
            />
            )
        }
    }

    const showProducts = () => {
        while(isLoading2){
            return (<ActivityIndicator size="large" color="green"></ActivityIndicator>);
        }
        if ( productdata.length == 0 ) {
            return (
                <Text style = {{ fontSize: 20, color: 'gray', justifyContent: 'center', textAlign: 'center', marginTop: 25, marginBottom: 25 }}> No Available Products :{'('}</Text>
            )
        } else {
            return (
            <FlatList
                style = {{ marginLeft: 30, height: 150 }}
                data={productdata}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <View>
                    <Text style = {styles.description}>{item.product_name}</Text>
                    <Text style = {styles.description2}>₱ {item.product_price}</Text>
                </View>
                )}
            />
            )
        }
    }
    
    useEffect(() => {
        getServices();
        getProducts();
    }, []);

    

    return(
        <View style = { styles.body }>
            <Image source = { require('../images/paw.png')} style = {styles.paw}/>
            <Image source = { require('../images/bone.png')} style = {styles.bone}/>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.goBack()} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <View style = {styles.whiteBox}>
            <Text style = { styles.header }>{route.params.item.clinic_name}</Text>

            <Image source = { require('../images/pin.png')} style = {styles.pin}/>
            <Text style = { styles.semiHeader }>{route.params.item.address}</Text>
            <Image source = { require('../images/email.png')} style = {styles.email}/>
            <Text style = { styles.semiHeader }>{route.params.item.email}</Text>
            <Image source = { require('../images/phone.png')} style = {styles.email}/>
            <Text style = { styles.semiHeader }>{route.params.item.phone_number}</Text>

            <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10}}>
                <Text style = {{ color: 'gray' }}>Available Services</Text>
            </View>
            {showServices()}

            <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10}}>
                <Text style = {{ color: 'gray' }}>Available Products</Text>
            </View>
            {showProducts()}

            <TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('AppointmentDateAndTime', {clinicID:route.params.item.id, clinicNAME:route.params.item.clinic_name, clinicADDRESS:route.params.item.address}) }>
                <Text style = {styles.btnText}>Appoint now</Text>

            </TouchableOpacity>

            

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
    backgroundColor: 'rgb(109, 169, 22)',
    flex: 1,
    fontFamily: 'Roboto',
    },
    pin:{
    width: 18,
    height: 22,
    marginTop: 5
    },
    email:{
    width: 21,
    height: 18,
    marginTop: 5
    },
    semiHeader:{
    color: 'rgb(73, 80, 74)',
    marginTop: -24,
    marginLeft: 40,
    fontSize: 18,
    marginBottom: 10,
    },
    description:{
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    },
    description2:{
    fontSize: 14,
    color: 'gray',
    marginLeft: 180,
    marginTop: -22,
    marginBottom: 5
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
    width: Dimensions.get('window').width,
    flex: 1,
    marginTop: 160,
    padding: 30,
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
    marginBottom: 20,
    fontWeight: 'bold'
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
    width: 300,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    },
    petText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
    },
});

export default ClinicDetailsScreen;