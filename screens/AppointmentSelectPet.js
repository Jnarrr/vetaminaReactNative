import React from 'react';
import {View, Button, Text} from 'react-native';

const AppointmentSelectPetScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Appointment Select Pet View</Text>
            <Button onPress={ () => navigation.navigate('Appointment')} title='Done'></Button>
        </View>
    );
};

export default AppointmentSelectPetScreen;