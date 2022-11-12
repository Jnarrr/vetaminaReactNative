import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';

const PetDetailsScreen = ( {navigation, route} ) => {
    return(
        <View style = { styles.body }>
            <TouchableOpacity onPress={ () => navigation.goBack(null)}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <ScrollView style = {styles.whiteBox}>
            <Text style = { styles.header }>{route.params.item.pet_name}</Text>
            <Text style = { styles.petText }>Type: {route.params.item.pet_type}</Text>
            <Text style = { styles.petText }>Sex: {route.params.item.pet_sex}</Text>
            <Text style = { styles.petText }>Breed: {route.params.item.pet_breed}</Text>
            <Text style = { styles.petText }>Birthdate: {route.params.item.pet_birthdate}</Text>
            <Text style = { styles.petText }>Weight: {route.params.item.pet_weight}</Text>
            <Text style = { styles.petText }>Description: {route.params.item.pet_description}</Text>

            <TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('MedicalRecord', {petID:route.params.item.id, petNAME:route.params.item.pet_name}) }>
                <Text style = {styles.btnText}>View Medical Record</Text>
            </TouchableOpacity>

            

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'rgb(109, 169, 22)',
        flex: 1,
        fontFamily: 'Roboto',
    },
    back: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginTop: 30
    },
    header:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    header: {
        fontSize: 30,
        color: '#504949',
        fontWeight: 'bold'
    },
    petText:{
        fontSize: 20,
        color: 'black'
    },
    whiteBox: {
        width: 360,
        height: 300,
        marginTop: 200,
        padding: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOffset: {width: 6, height: 6},
        shadowRadius: 10,
        shadowColor: 'white',
        shadowOpacity: 1,
        backgroundColor: 'white',
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
})

export default PetDetailsScreen;