import React, { useState, useEffect } from 'react';
import {View, Button, Image, Text, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const AddPetScreen = ( {navigation} ) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [sex, setSex] = useState('');
    const [breed, setBreed] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getPets = async () => {
        try {
        const response = await fetch('http://localhost:8000/api/pets');
        const json = await response.json();
        setData(json.pets);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        getPets();
    }, []);

    const AddPetBtn = async () => {
        try{
            const response = await fetch('http://localhost:8000/api/pets', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pet_name: name,
                    pet_type: type,
                    pet_sex: sex,
                    pet_breed: breed,
                    pet_birthdate: birthdate,
                    pet_weight: weight,
                    pet_description: description
                })
            });
            if ((response).status === 201) {
                setName('');
                setType('');
                setSex('');
                setBreed('');
                setBirthdate('');
                setWeight('');
                setDescription('');
                getPets();
            }
            Alert.alert('Pet Added!')
            navigation.navigate('Appointment');
        const json = await response.json();
        setData(json.pets);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    return (
    <View style = {{ padding: 30, alignItems: 'center' }}>
        <Image source = { require('../images/defaultPetImage.png')} style = {styles.pic}/>
        <Text style = { styles.header }>Pet Information</Text>
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setName(text)] }
        placeholder='Enter Name'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setType(text)] }
        placeholder='Enter Type of Pet'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setSex(text)] }
        placeholder='Enter Sex'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setBreed(text)] }
        placeholder='Enter Breed'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setBirthdate(text)] }
        placeholder='Enter Birthdate'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setWeight(text)] }
        placeholder='Enter Weight'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setDescription(text)] }
        placeholder='Enter Description'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        
        <TouchableOpacity style = {styles.addButton} onPress = { AddPetBtn }>
            <Text style = { styles.addButtonText }>Finish</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    pic: {
    width: 150,
    height: 150,
    borderRadius: 10,
    },
    header: {
    fontSize: 30,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
    input: {
    padding: 2,
    width: 300,
    height: 40,
    marginBottom: 5,
    marginTop: 5,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 20,
    color: 'black',
    },
    addButton: {
    width: 110,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#15D005',
    borderRadius: 50,
    },
    addButtonText:{
    fontSize: 16,
    color: 'white',
    },
})

export default AddPetScreen;