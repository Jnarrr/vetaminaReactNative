import React from 'react';
import {View, Button, Text} from 'react-native';

const AppointmentDateAndTimeScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Appointment Date And Time View</Text>
            <Button onPress={ () => navigation.navigate('AppointmentSelectPet')} title='Next'></Button>
        </View>
    );
};

export default AppointmentDateAndTimeScreen;