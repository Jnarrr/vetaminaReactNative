import React, { useState } from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import CoffeeAutonomous from "../components/CoffeeAutonomous";

const SearchScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Search View</Text>
            <Button onPress={ () => navigation.navigate('AppointmentProcedure')} title='Create Appointment'></Button>
        </View>
    );
};


export default SearchScreen;