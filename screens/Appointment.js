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

    const showAppointments = () => {
        while(isLoading){
            return (<ActivityIndicator size="large" color="green" style = {{ marginTop: 207, marginBottom: 207 }}></ActivityIndicator>);
        }
        if ( data.length == 0 ) {
            return (
                <View style = {{ marginTop: 190, marginBottom: 190 }}>
                    <Text style = {{ fontSize: 20, color: 'gray', justifyContent: 'center', textAlign: 'center' }}> 
                        Book your first appointment! 
                    </Text>
                    <TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('Search') }>
                        <Text style = {styles.btnText}>Find Clinic</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
            <FlatList
            style = {{ height: 450 }}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
            <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('AppointmentDetails', {item:item})}>
                <Text style = {styles.header2}>{item.clinic_name}</Text>
                <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 3}}/>
                <Text style = {styles.description}>{item.date}{'          '}{item.time}</Text>
                <Text style = {styles.description}>{item.status}</Text>
            </TouchableOpacity>
            )}
            />
            )
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
            {showAppointments()}
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
    borderTopColor: 'green',
    borderTopWidth: 3
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
    width: 150,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    },
})

export default AppointmentScreen;