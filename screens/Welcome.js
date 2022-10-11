import React from 'react';
import {View, Button, Text} from 'react-native';

const WelcomeScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Welcome View</Text>
            <Button onPress={ () => navigation.navigate('Register')} title='Sign Up'></Button>
            <Button onPress={ () => navigation.navigate('Login')} title='Login'></Button>
        </View>
    );
};

export default WelcomeScreen;