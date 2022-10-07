import React, { useState } from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const AppointmentProcedureScreen = ( {navigation} ) => {
    const [isSelected, setSelection] = useState(false);

    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Appointment Procedure View</Text>
            <View>
                <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                />
                <Text style={styles.label}>Do you like React Native?</Text>
            </View>
            <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
            <Button onPress={ () => navigation.navigate('AppointmentDateAndTime')} title='Next'></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    },
    checkbox: {
    alignSelf: "center",
    onCheckColor: '#6DA916',
    onFillColor: '#6DA916',
    onTintColor: '#6DA916',
    },
    label: {
    margin: 8,
    color: 'black',
    },
})

export default AppointmentProcedureScreen;