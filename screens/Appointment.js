import React from 'react';
import {View, Button, Text, ScrollView, StyleSheet} from 'react-native';
import AppointmentItem from '../components/appointmentContainer';

const AppointmentScreen = ( {navigation} ) => {
    return(
        <View style = {{ padding: 30 }}>
            <Text style = { styles.header }>Your Appointments</Text>
            <ScrollView style = {{ height: 550 }}>
                <AppointmentItem />
                <AppointmentItem />
                <AppointmentItem />
                <AppointmentItem />
                <AppointmentItem />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
    fontSize: 30,
    marginLeft: -15,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
})

export default AppointmentScreen;