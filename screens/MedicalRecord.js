import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';

const MedicalRecordScreen = ( {navigation, route} ) => {
    var pet_ID = route.params.petID;
    var pet_NAME = route.params.petNAME;

    return(
        <View style = { styles.body }>
            <TouchableOpacity onPress={ () => navigation.goBack(null)}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <ScrollView style = {styles.whiteBox}>
                <Text style = { styles.header }>Medical Record</Text>
                <Text style = { styles.petText }>ID: {pet_ID}</Text>
                <Text style = { styles.petText }>name: {pet_NAME}</Text>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'rgb(109, 169, 22)',
        flex: 1,
        fontFamily: 'Roboto',
    },
    back: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginTop: 30
    },
    header:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    header: {
        fontSize: 30,
        color: '#504949',
        fontWeight: 'bold'
    },
    petText:{
        fontSize: 20,
        color: 'black'
    },
    whiteBox: {
        width: 360,
        height: 300,
        marginTop: 200,
        padding: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOffset: {width: 6, height: 6},
        shadowRadius: 10,
        shadowColor: 'white',
        shadowOpacity: 1,
        backgroundColor: 'white',
    },
    btnText:{
        color: 'white',
        fontSize: 14,
        padding: 8,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    btn:{
        backgroundColor: 'rgb(80, 140, 2)',
        color: 'white',
        width: 300,
        height: 35,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
})

export default MedicalRecordScreen;