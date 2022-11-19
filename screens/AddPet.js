import React, { useState, useEffect } from 'react';
import {View, Button, Image, Text, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';

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

    //dropdown
    const petType = [
        { label: 'Dog', value: 'Dog' },
        { label: 'Cat', value: 'Cat' },
    ];
    const [isFocuspetType, setIsFocuspetType] = useState(false);

    const petSex = [
        { label: 'M', value: 'M' },
        { label: 'F', value: 'F' },
    ];
    const [isFocuspetSex, setIsFocuspetSex] = useState(false);

    const petDogBreed = [
        { label: 'Askal', value: 'Askal' },
        { label: 'Huskey', value: 'Huskey' },
    ];
    const petCatBreed = [
        { label: 'Siamese', value: 'Siamese' },
        { label: 'Siberian', value: 'Siberian' },
    ];
    const [isFocuspetBreed, setIsFocuspetBreed] = useState(false);

    const day = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
    ];

    const month = [
        { label: 'M', value: 'M' },
        { label: 'F', value: 'F' },
    ];

    const year = [
        { label: 'M', value: 'M' },
        { label: 'F', value: 'F' },
    ];

    var userID = global.id;

    const AddPetBtn = async () => {
        try{
            const response = await fetch('http://localhost:8000/api/add-pets', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userID,
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
                //getPets();
            }
            Alert.alert('Pet Added!')
            navigation.navigate('Pets');
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
        <ScrollView>
        <Image source = { require('../images/defaultPetImage.png')} style = {styles.pic}/>
        <Text style = { styles.header }>Pet Information</Text>
        
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setName(text)] }
        placeholder='Enter Name'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <Dropdown
        style={[styles.input, isFocuspetType && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={petType}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocuspetType ? 'Select Pet Type' : '...'}
        value={type}
        onFocus={() => setIsFocuspetType(true)}
        onBlur={() => setIsFocuspetType(false)}
        onChange={item => {
            setType(item.value);
            setIsFocuspetType(false);
        }}
        />
        <Dropdown
        style={[styles.input, isFocuspetSex && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={petSex}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocuspetSex ? 'Select Sex' : '...'}
        value={sex}
        onFocus={() => setIsFocuspetSex(true)}
        onBlur={() => setIsFocuspetSex(false)}
        onChange={item => {
            setSex(item.value);
            setIsFocuspetSex(false);
        }}
        />
        <Dropdown
        style={[styles.input, isFocuspetBreed && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={type == 'Dog' ? petDogBreed : petCatBreed}
        maxHeight={300}
        labelField="label"
        valueField="value"
        search
        placeholder={!isFocuspetBreed ? 'Select Breed' : '...'}
        value={breed}
        onFocus={() => setIsFocuspetBreed(true)}
        onBlur={() => setIsFocuspetBreed(false)}
        onChange={item => {
            setBreed(item.value);
            setIsFocuspetBreed(false);
        }}
        />
        <Dropdown
        style={[styles.inputDate, isFocuspetSex && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={petSex}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocuspetSex ? 'Day' : '...'}
        value={sex}
        onFocus={() => setIsFocuspetSex(true)}
        onBlur={() => setIsFocuspetSex(false)}
        onChange={item => {
            setSex(item.value);
            setIsFocuspetSex(false);
        }}
        />
        <Dropdown
        style={[styles.inputDateRow, isFocuspetSex && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={petSex}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocuspetSex ? 'Month' : '...'}
        value={sex}
        onFocus={() => setIsFocuspetSex(true)}
        onBlur={() => setIsFocuspetSex(false)}
        onChange={item => {
            setSex(item.value);
            setIsFocuspetSex(false);
        }}
        />
        <Dropdown
        style={[styles.inputDateRow2, isFocuspetSex && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={petSex}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocuspetSex ? 'Year' : '...'}
        value={sex}
        onFocus={() => setIsFocuspetSex(true)}
        onBlur={() => setIsFocuspetSex(false)}
        onChange={item => {
            setSex(item.value);
            setIsFocuspetSex(false);
        }}
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setWeight(text)] }
        placeholder='Enter Weight(kg)'
        placeholderTextColor= 'gray'
        maxLength={15} 
        keyboardType={'number-pad'}
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setDescription(text)] }
        placeholder='Enter Description'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        </ScrollView>
        
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
    fontSize: 16,
    color: 'black',
    },
    inputDate: {
    padding: 2,
    width: 90,
    height: 40,
    marginBottom: 5,
    marginTop: 5,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
    color: 'black',
    },
    inputDateRow: {
    padding: 2,
    width: 90,
    height: 40,
    marginBottom: 5,
    marginTop: -45,
    marginLeft: 105,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
    color: 'black',
    },
    inputDateRow2: {
    padding: 2,
    width: 90,
    height: 40,
    marginBottom: 5,
    marginTop: -45,
    marginLeft: 210,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
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
    dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    },
    placeholderStyle: {
    fontSize: 16,
    color: 'gray',
    },
    selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    },
})

export default AddPetScreen;