import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

const ProfileDetailsScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = { styles.petText }>Profile Details View</Text>
            <Text style = { styles.petText }>ID: {global.id}</Text>
            <Text style = { styles.petText }>Name: {global.username}</Text>
            <Text style = { styles.petText }>Email: {global.email}</Text>
            <Text style = { styles.petText }>Phone Number: {global.mobile_number}</Text>
            <Text style = { styles.petText }>Birthdate: {global.birthdate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    petText:{
        fontSize: 20,
        color: 'black'
    }
})

export default ProfileDetailsScreen;