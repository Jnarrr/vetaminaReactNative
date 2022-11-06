import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

const PetDetailsScreen = ( {route} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = { styles.petText }>Pet Details View</Text>
            <Text style = { styles.petText }>ID: {route.params.item.id}</Text>
            <Text style = { styles.petText }>Name: {route.params.item.pet_name}</Text>
            <Text style = { styles.petText }>Type: {route.params.item.pet_type}</Text>
            <Text style = { styles.petText }>Sex: {route.params.item.pet_sex}</Text>
            <Text style = { styles.petText }>Breed: {route.params.item.pet_breed}</Text>
            <Text style = { styles.petText }>Birthdate: {route.params.item.pet_birthdate}</Text>
            <Text style = { styles.petText }>Weight: {route.params.item.pet_weight}</Text>
            <Text style = { styles.petText }>Description: {route.params.item.pet_description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    petText:{
        fontSize: 20,
        color: 'black'
    }
})

export default PetDetailsScreen;