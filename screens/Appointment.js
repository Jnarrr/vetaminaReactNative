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
                style = {{ height: 550 }}
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={ () => navigation.navigate('AppointmentDetails', {item:item})}>
                    <Text style = {styles.petText}>{item.procedure}, {item.date}, {item.time}</Text>
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
    petText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
    },
    refresh: {
    position: 'absolute',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30,
    backgroundColor: 'brown',
    borderRadius: 50,
    },
})

export default AppointmentScreen;