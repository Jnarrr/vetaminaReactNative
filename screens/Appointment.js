import React from 'react';
import {View, Button, Text} from 'react-native';

const AppointmentScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Appointment View</Text>
            <Text style = {{ fontSize: 20, color: 'black'}}>Appointment Lists</Text>
        </View>
    );
};

export default AppointmentScreen;