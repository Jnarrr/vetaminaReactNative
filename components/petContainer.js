import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function PetItem() {
    return (
    <View style = {[styles.box, styles.elevation]}>
        <Image source = { require('../images/clinicDefault.png')} style = {styles.pic}/>
        <Text style = {styles.header}>Dog</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    elevation:{
    elevation: 20,
    shadowColor: '#52006A',
    },
    box: {
    marginTop: 20,
    width: 300,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    },
    pic: {
    width: 100,
    height: 100,
    borderRadius: 10,
    },
    header: {
    fontSize: 16,
    marginTop: -95,
    marginLeft: 110,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
})