import React from 'react';
import {View, Button, Text} from 'react-native';

const AppointmentProcedureScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Appointment Procedure View</Text>
            <Button onPress={ () => navigation.navigate('AppointmentDateAndTime')} title='Next'></Button>
        </View>
    );
};

export default AppointmentProcedureScreen;