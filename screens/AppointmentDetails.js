import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

const AppointmentDetailsScreen = ( {route} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = { styles.petText }>Appointment Details View</Text>
            <Text style = { styles.petText }>ID: {route.params.item.id}</Text>
            <Text style = { styles.petText }>Procedure: {route.params.item.procedure}</Text>
            <Text style = { styles.petText }>Date: {route.params.item.date}</Text>
            <Text style = { styles.petText }>Time: {route.params.item.time}</Text>
            <Text style = { styles.petText }>Pet: {route.params.item.pet}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    petText:{
        fontSize: 20,
        color: 'black'
    }
})

export default AppointmentDetailsScreen;