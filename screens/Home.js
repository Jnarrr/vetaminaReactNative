import React from 'react';
import {View, Button, Text} from 'react-native';

const HomeScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Home View</Text>
        </View>
    );
};

export default HomeScreen;