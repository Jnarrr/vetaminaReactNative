import React, {useState, useEffect} from 'react';
import {View, Button, Image, Text, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const EditPetDetailsScreen = ( {navigation, route} ) => {
    var pet_id = route.params.petID;

    const [name, setName] = useState(route.params.petNAME);
    const [type, setType] = useState(route.params.petTYPE);
    const [sex, setSex] = useState(route.params.petSEX);
    const [breed, setBreed] = useState(route.params.petBREED);
    const [weight, setWeight] = useState(route.params.petWEIGHT);
    const [description, setDescription] = useState(route.params.petDESC);

    const [isLoading, setLoading] = useState(true);
    const [petdata, setData] = useState([]);

    const getPetInfo = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/edit-pets/${pet_id}`);
        const json = await response.json();
        setData(json.pet);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        getPetInfo();
    }, []);

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
        { label: 'Australian Shepherd', value: 'Australian Shepherd' },
        { label: 'Beagle', value: 'Beagle' },
        { label: 'Boxer', value: 'Boxer' },
        { label: 'Bulldog', value: 'Bulldog' },
        { label: 'Chow Chow', value: 'Chow Chow' },
        { label: 'Dachshund', value: 'Dachshund' },
        { label: 'Doberman Pincher', value: 'Doberman Pincher' },
        { label: 'French Bulldog', value: 'French Bulldog' },
        { label: 'German Shepherd', value: 'German Shepherd' },
        { label: 'Golden Retriever', value: 'Golden Retriever' },
        { label: 'Great Dane', value: 'Great Dane' },
        { label: 'Labrador Retriever', value: 'Labrador Retriever' },
        { label: 'Miniature Schnauzer', value: 'Miniature Schnauzer' },
        { label: 'Pembroke Welsh Corgi', value: 'Pembroke Welsh Corgi' },
        { label: 'Pointers (German Shorthaired)', value: 'Pointers (German Shorthaired)' },
        { label: 'Poodle', value: 'Poodle' },
        { label: 'Rottweiler', value: 'Rottweiler' },
        { label: 'Siberian Husky', value: 'Siberian Husky' },
        { label: 'Shih Tzu', value: 'Shih Tzu' },
        { label: 'Yorkshire Terrier', value: 'Yorkshire Terrier' },
    ];
    const petCatBreed = [
        { label: 'Abyssinian', value: 'Abyssinian' },
        { label: 'American Curl', value: 'American Curl' },
        { label: 'American Shorthair', value: 'American Shorthair' },
        { label: 'Bengal', value: 'Bengal' },
        { label: 'Birman', value: 'Birman' },
        { label: 'British Shorthair', value: 'British Shorthair' },
        { label: 'Devon Rex', value: 'Devon Rex' },
        { label: 'Exotic Shorthair', value: 'Exotic Shorthair' },
        { label: 'Himalayan', value: 'Himalayan' },
        { label: 'Maine Coon', value: 'Maine Coon' },
        { label: 'Oriental Shorthair', value: 'Oriental Shorthair' },
        { label: 'Persian', value: 'Persian' },
        { label: 'Philippine Shorthair (Puspin)', value: 'Philippine Shorthair (Puspin)' },
        { label: 'Ragdoll', value: 'Ragdoll' },
        { label: 'Russian Blue', value: 'Russian Blue' },
        { label: 'Siamese', value: 'Siamese' },
        { label: 'Sphynx', value: 'Sphynx' },
    ];
    const [isFocuspetBreed, setIsFocuspetBreed] = useState(false);

    const updatePet = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/update-pets/${pet_id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pet_name: name,
                    pet_type: type,
                    pet_sex: sex,
                    pet_breed: breed,
                    pet_weight: weight,
                    pet_description: description
                })
            });
            if ((response).status === 201) {
                setName('');
                setWeight('');
                setDescription('');
            }
        } catch (error) {
        console.error(error);
        } finally {
        console.log(name,type,sex,breed,weight,description);
        Alert.alert('Pet Information Updated!');
        navigation.navigate('Pets');
        }
    }

    return(
        <View style = {{ padding: 30, justifyContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
        <Text style = { styles.header }>Pet Information</Text>

        
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setName(text)] }
        placeholder='Enter Name'
        placeholderTextColor= 'gray'
        maxLength={15}
        value = {name}
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
        placeholder={!isFocuspetSex ? 'Select Pet Sex' : '...'}
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
        placeholder={!isFocuspetBreed ? 'Select Pet Breed' : '...'}
        value={breed}
        onFocus={() => setIsFocuspetBreed(true)}
        onBlur={() => setIsFocuspetBreed(false)}
        onChange={item => {
            setBreed(item.value);
            setIsFocuspetBreed(false);
        }}
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setWeight(text)] }
        placeholder='Enter Weight(kg)'
        placeholderTextColor= 'gray'
        maxLength={15} 
        keyboardType={'number-pad'}
        value = {weight}
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setDescription(text)] }
        placeholder='Enter Description'
        placeholderTextColor= 'gray'
        maxLength={15} 
        value = {description}
        />
        </ScrollView>
        
        <TouchableOpacity style = {styles.addButton} onPress = { updatePet }>
            <Text style = { styles.addButtonText }>Finish</Text>
        </TouchableOpacity>
        
    </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        color: '#504949',
        fontWeight: 'bold'
    },
    petText:{
        fontSize: 20,
        color: 'black'
    },
});

export default EditPetDetailsScreen;