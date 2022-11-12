import React from 'react';
import {View, Button, Text} from 'react-native';

const MedicalRecordScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Medical Record View</Text>
        </View>
    );
};

export default MedicalRecordScreen;