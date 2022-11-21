import React, { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, Alert} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const AppointmentDateAndTimeScreen = ( {navigation, route} ) => {
    //inputs
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState('Waiting for Approval');

    //list
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    //dropdown
    const [isFocus, setIsFocus] = useState(false);
    const [petsdata, setPetsData] = useState([]);
    const [petsName, setpetsName] = useState(null);
    const [pets, setPets] = useState(null);

    //dropdown procedure
    const [proceduredata, setProcedureData] = useState([]);
    const [IsFocusProcedure, setIsFocusProcedure] = useState(false);
    const [procedureselection, setProcedureSelection] = useState([]);
    const [procedureValue, setProcedureValue] = useState([]);
    const [procedure, setProcedure] = useState([]);

    //fix dropdown
    const [petselection, setPetSelection] = useState([]);
    const [petselectedID, setPetSelectedID] = useState([]);

  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        }, 
        );
    };

    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };

    var userID = global.id;
    var clinic_ID = route.params.clinicID;
    var clinic_NAME = route.params.clinicNAME;
    var clinic_ADDRESS = route.params.clinicADDRESS;

    const getProcedures = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/services/${clinic_ID}`);
        const json = await response.json();
        setProcedureData(json.services);
        const procedureSelection = json.services.map((procedures) => ({
            label: procedures.service_name,
            value: procedures.service_name,
        }));
        setProcedureSelection(procedureSelection);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    const getPets = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/pets/${id}`);
        const json = await response.json();
        setPetsData(json.pets);
        const petSelection = json.pets.map((pet) => ({
            label: pet.pet_name,
            value: pet.id,
        }));
        setPetSelection(petSelection);
        //let tempArray = [];
        //tempArray.push({label: petsdata.pet_name, value: petsdata.id});
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
        getProcedures();
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
                    date: date.toLocaleDateString(),
                    time: date.toLocaleTimeString(),
                    pet: petselectedID,
                    status: status,
                })
            });
            if ((response).status === 201) {
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
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'green' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={procedureselection}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Procedure' : '...'}
            searchPlaceholder="Search..."
            value={procedure}
            onFocus={() => setIsFocusProcedure(true)}
            onBlur={() => setIsFocusProcedure(false)}
            onChange={item => {
                setProcedureValue(item.value);
                setIsFocusProcedure(false);
            }}
            />
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />
            <Text>selected: {date.toLocaleString()}</Text>
            <Text>{date.toLocaleDateString()}</Text>
            <Text>{date.toLocaleTimeString()}</Text>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'green' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={petselection}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Pet' : '...'}
            searchPlaceholder="Search..."
            value={pets}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setpetsName(item.label);
                //petsdata.find(pet => pet.id === item.value);
                setPetSelectedID(item.value);
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