import React, { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const AppointmentDateAndTimeScreen = ( {navigation, route} ) => {
    //inputs
    const [procedure, setProcedure] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [pet, setPet] = useState('');
    const [status, setStatus] = useState('Waiting for Approval');

    //list
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    //dropdown
    const [isFocus, setIsFocus] = useState(false);
    const [petsdata, setPetsData] = useState([]);
    const [petsName, setpetsName] = useState(null);
    const [pets, setPets] = useState(null);

    const drpdata = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    var userID = global.id;
    var clinic_ID = route.params.clinicID;
    var clinic_NAME = route.params.clinicNAME;
    var clinic_ADDRESS = route.params.clinicADDRESS;

    const getPets = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/pets/${id}`);
        const json = await response.json();
        setPetsData(json.pets);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
      }

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
        getPets();
    }, []);

    const dropDrown = () =>{
        var count = Object.keys(petsdata).length;
        let PetsArray = [];
        for (var i = 0; i < count; i++) {
        PetsArray.push({
            value: petsdata[i].id,
            label: petsdata[i].pet_name,
        });
        }
        setPetsData(PetsArray);
    }

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
        <View style = {{ flex: 1 }}>
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
            style = { [styles.input, isFocus && { borderColor: 'green' }] }
            onChangeText = { (text) => [setTime(text)] }
            placeholder='Enter Time'
            placeholderTextColor= 'gray'
            maxLength={15} 
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPet(text)] }
            placeholder='Enter Pet'
            placeholderTextColor= 'gray'
            maxLength={15} 
            />
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'green' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={petsdata}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={pets}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setPetsData(item.value);
                setpetsName(item.label);
                setIsFocus(false);
            }}
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1.5,
    fontSize: 20,
    color: 'black',
    },
    petText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
    },
    dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
    },
    placeholderStyle: {
    fontSize: 16,
    color: 'black',
    },
    selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    },
    inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
    },
})

export default AppointmentDateAndTimeScreen;