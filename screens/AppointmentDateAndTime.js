import React, { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, Alert} from 'react-native';

const AppointmentDateAndTimeScreen = ( {navigation, route} ) => {
    const [procedure, setProcedure] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [pet, setPet] = useState('');
    const [status, setStatus] = useState('Waiting for Approval');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    var userID = global.id;
    var clinic_ID = route.params.clinicID;
    var clinic_NAME = route.params.clinicNAME;
    var clinic_ADDRESS = route.params.clinicADDRESS;

    const getAppointments = async () => {
        try {
        const response = await fetch('http://localhost:8000/api/appointments/{id}');
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

    const AddAppointmentBtn = async () => {
        try{
            const response = await fetch('http://localhost:8000/api/add-appointments', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userID,
                    clinic_id: clinic_ID,
                    clinic_name: clinic_NAME,
                    clinic_address: clinic_ADDRESS,
                    procedure: procedure,
                    date: date,
                    time: time,
                    pet: pet,
                    status: status,
                })
            });
            if ((response).status === 201) {
                setProcedure('');
                setDate('');
                setTime('');
                setPet('');
                setStatus('');
            }
            Alert.alert('Appointment Added!');
            navigation.navigate('Appointment');
        const json = await response.json();
        setData(json.appointments);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = { styles.petText }>ID: {clinic_ID}</Text>
            <Text style = { styles.petText }>Clinic Name: {clinic_NAME}</Text>
            <Text style = { styles.petText }>Clinic Address: {clinic_ADDRESS}</Text>
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setProcedure(text)] }
            placeholder='Enter Procedure'
            placeholderTextColor= 'gray'
            maxLength={15} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setDate(text)] }
            placeholder='Enter Date'
            placeholderTextColor= 'gray'
            maxLength={15} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setTime(text)] }
            placeholder='Enter Time'
            placeholderTextColor= 'gray'
            maxLength={15} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPet(text)] }
            placeholder='Enter Pet'
            placeholderTextColor= 'gray'
            maxLength={15} 
            />
            <Button onPress={ AddAppointmentBtn } title='Create Appointment'></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
    padding: 2,
    width: 300,
    height: 40,
    marginLeft: 30,
    marginBottom: 10,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 20,
    color: 'black',
    },
    petText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
        },
})

export default AppointmentDateAndTimeScreen;