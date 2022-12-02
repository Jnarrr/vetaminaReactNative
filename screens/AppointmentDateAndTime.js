import React, { useState, useEffect } from 'react';
import {View, Button, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Dimensions, Alert} from 'react-native';
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
    const [procedureName, setprocedureName] = useState(null);
    const [procedureValue, setProcedureValue] = useState([]);
    const [procedure, setProcedure] = useState([]);

    //fix dropdown
    const [petselection, setPetSelection] = useState([]);
    const [petselectedID, setPetSelectedID] = useState([]);

    //Time Selection Dropdown
    const [isTimeFocus, setIsTimeFocus] = useState(false);
    const [timedata, setTimeData] = useState([]);
    const [value, setValue] = useState(null);
    const [timeSelection, setTimeSelection] = useState([]);
    const [dateSelection, setDateSelection] = useState([]);
    const [newtime, setNewTime] = useState([]);

  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
        var today = new Date()
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: false,
            minimumDate: (today),
            maximumDate: (new Date(today.getFullYear(), today.getMonth()+3, today.getDate())),
            minuteInterval: (10),
        }, 
        );
    };

    const showDatepicker = () => {
        showMode('date');
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

    const trim = () => {
        const data = [
            {label: '9:00', value: '9:00'},
            {label: '9:30', value: '9:30'},
            {label: '10:00', value: '10:00'},
            {label: '10:30', value: '10:30'},
            {label: '11:00', value: '11:00'},
            {label: '11:30', value: '11:30'},
            {label: '13:00', value: '13:00'},
            {label: '13:30', value: '13:30'}, 
            {label: '14:00', value: '14:00'}, 
            {label: '14:30', value: '14:30'},
            {label: '15:00', value: '15:00'}, 
            {label: '15:30', value: '15:30'}, 
            {label: '16:00', value: '16:00'}, 
            {label: '16:30', value: '16:30'}, 
            {label: '17:00', value: '17:00'}, 
            {label: '17:30', value: '17:30'}, 
            {label: '18:00', value: '18:00'}, 
        ];
        console.log(dateSelection);
        if (dateSelection.includes(date.toLocaleDateString()) == true){
            myArray = data.filter(ar => !timeSelection.find(rm => (rm.label === ar.label && ar.value === rm.value)) )
            setNewTime(myArray);
        } 
        if (dateSelection.includes(date.toLocaleDateString()) == false){
            setNewTime(data);
        } 
        console.log(newtime);
    }

    const getTimes = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/ClinicAppointments/${clinic_ID}`);
        const json = await response.json();
        setTimeData(json.appointments);
        const timeSelection = json.appointments.map((appointment) => ({
            label: appointment.time,
            value: appointment.time,
        }));
        const dateSelection = json.appointments.map((appointment) => (
            appointment.date
        ));
        setTimeSelection(timeSelection);
        setDateSelection(dateSelection);
        trim();
        
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
        getTimes();
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
                    procedure: procedureValue,
                    date: date.toLocaleDateString(),
                    time: value,
                    pet: petselectedID,
                    status: status,
                })
            });
            if ((response).status === 200) {
                setStatus('');
                Alert.alert('Appointment Added!');
                navigation.navigate('Appointment');
            }
            else {
                Alert.alert('Please Complete the form');
            }
        const json = await response.json();
        setData(json.appointments);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    return(
        <View style = { styles.body }>
            <Image source = { require('../images/paw.png')} style = {styles.paw}/>
            <Image source = { require('../images/bone.png')} style = {styles.bone}/>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.goBack()} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <ScrollView style = {styles.whiteBox}>
            <Text style = { styles.header }>Book Appointment</Text>
            <Dropdown
            style={[styles.input, isFocus && { borderColor: 'green' }]}
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
                setprocedureName(item.label);
                setProcedureValue(item.value);
                setIsFocusProcedure(false);
            }}
            />
            <Text style = {styles.birthdateText}>{date.toLocaleDateString()}</Text>
            <TouchableOpacity style = {styles.btnBirthdate} onPress={showDatepicker} title="Show date picker!">
                <Text style = {styles.btnText}>Select Date</Text>
            </TouchableOpacity>
            
            <Dropdown
            style={[styles.input, isTimeFocus && { borderColor: 'green' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={newtime}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Time' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => [setIsTimeFocus(true), trim()]}
            onBlur={() => setIsTimeFocus(false)}
            onChange={item => {
            setValue(item.value);
            setIsTimeFocus(false);
            }}
            />
            
            <Dropdown
            style={[styles.input, isFocus && { borderColor: 'green' }]}
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
            <TouchableOpacity style = {styles.btn} onPress={ AddAppointmentBtn }>
                <Text style = {styles.btnText}>Book Appointment</Text>
            </TouchableOpacity>

            

            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    input: {
    padding: 2,
    height: 40,
    marginBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1.5,
    fontSize: 20,
    color: 'black',
    },
    placeholderStyle: {
    fontSize: 16,
    color: 'gray',
    },
    selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    },
    inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'gray',
    },
    body: {
    backgroundColor: 'rgb(109, 169, 22)',
    flex: 1,
    fontFamily: 'Roboto',
    },
    pin:{
    width: 18,
    height: 22,
    },
    semiHeader:{
    color: 'rgb(73, 80, 74)',
    marginTop: -22,
    marginLeft: 24,
    fontSize: 18,
    marginBottom: 10,
    },
    clinic: {
    color: 'rgb(73, 80, 74)',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    borderTopColor: 'rgb(73, 80, 74)',
    borderTopWidth: 2,
    },
    description:{
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
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
    height: 300,
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
    btnBirthdate:{
    backgroundColor: 'rgb(80, 140, 2)',
    color: 'white',
    width: 150,
    height: 35,
    borderRadius: 5,
    marginLeft: 150,
    marginTop: 10,
    marginBottom: 10,
    },
    birthdateText:{
    color: 'gray',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: -40,
    marginTop: 10,
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
})

export default AppointmentDateAndTimeScreen;