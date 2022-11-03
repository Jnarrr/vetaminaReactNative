import React, { useState, useEffect } from 'react';
import {View, Button, Text, ScrollView, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
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
                <Text style = {styles.petText}>{item.procedure}, {item.date}, {item.time}</Text>
                )}
            />
            )}
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
})

export default AppointmentScreen;