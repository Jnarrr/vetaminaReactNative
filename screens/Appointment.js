import React, { useState, useEffect } from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import AppointmentItem from '../components/appointmentContainer';

const AppointmentScreen = ( {navigation} ) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getAppointments = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/appointments/${id}`);
        const json = await response.json();
        setData(json.appointments);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }
    
    const refresh = () => {
        setLoading(true);
        getAppointments();
    }

    useEffect(() => {
        getAppointments();
    }, []);

    return(
        <View style = {{ padding: 30 }}>
            <Text style = { styles.header }>Your Appointments</Text>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
                style = {{ height: 450 }}
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('AppointmentDetails', {item:item})}>
                    <Text style = {styles.header2}>{item.clinic_name}</Text>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 3}}/>
                    <Text style = {styles.description}>{item.date}{'          '}{item.time}</Text>
                    <Text style = {styles.description}>Status: {item.status}</Text>
                </TouchableOpacity>
                
                )}
            />
            )}
            <TouchableOpacity style = {styles.refresh} onPress={ refresh }>
                <Text style = {{ fontSize: 16, color: 'white' }}>Refresh</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
    fontSize: 30,
    marginLeft: -15,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
    item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    height: 120,
    },
    petText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
    },
    header2: {
    fontSize: 22,
    color: 'rgb(80, 140, 2)',
    fontWeight: 'bold'
    },
    description: {
    fontSize: 18,
    color: 'black',
    },
    description2: {
    fontSize: 18,
    color: 'black',
    marginTop: -23,
    marginLeft: 125
    },
    divider: {
    fontSize: 20,
    color: 'gray',
    marginTop: -20,
    },
    refresh: {
    position: 'absolute',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: -50,
    backgroundColor: 'brown',
    borderRadius: 50,
    },
})

export default AppointmentScreen;