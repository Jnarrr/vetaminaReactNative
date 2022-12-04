import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';

const showImage = (text) => {
    if (text == 'Dog'){
        return (<Image source = { require('../images/dog.png')} style = {styles.petTypeDog}/>)
    }
    if (text == 'Cat'){
        return (<Image source = { require('../images/cat.png')} style = {styles.petTypeCat}/>)
    }
}

const PetDetailsScreen = ( {navigation, route} ) => {
    return(
        <View style = { styles.body }>
            <Image source = { require('../images/paw.png')} style = {styles.paw}/>
            <Image source = { require('../images/bone.png')} style = {styles.bone}/>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.goBack()} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <ScrollView style = {styles.whiteBox}>
            {showImage(route.params.item.pet_type)}
            <Text style = { styles.header }>{route.params.item.pet_name}</Text>
            <View style = {{ margin: 10 }}>

                <View style = {{ flexDirection: 'row', justifyContent: 'space-evenly' }}> 
                <Text style = { styles.petText }>{route.params.item.pet_sex}</Text>
                <Text style = { styles.petText }>{route.params.item.pet_breed}</Text>
                </View>
                <View style = {{ flexDirection: 'row', justifyContent: 'space-evenly' }}> 
                <Text style = { styles.petText }>{route.params.item.pet_weight}kg</Text>
                <Text style = { styles.petText }>{route.params.item.pet_birthdate}</Text>
                </View>
                <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth}}>
                    <Text style = {{ color: 'gray' }}> Description </Text>
                </View>
                <Text style = { styles.petText }>{route.params.item.pet_description}</Text>
            </View>
            



            <View style = {{ flexDirection: 'row', justifyContent: 'space-evenly' }}> 

                <TouchableOpacity style = { styles.btnEdit } onPress={ () => navigation.navigate('EditPetDetails', {
                    petID:route.params.item.id,
                    petNAME:route.params.item.pet_name,
                    petTYPE:route.params.item.pet_type,
                    petSEX:route.params.item.pet_sex,
                    petBREED:route.params.item.pet_breed,
                    petBIRTHDATE:route.params.item.pet_birthdate,
                    petWEIGHT:route.params.item.pet_weight, 
                    petDESC:route.params.item.pet_description}) }>
                    <Text style = {styles.btnText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('MedicalRecord', {petID:route.params.item.id, petNAME:route.params.item.pet_name}) }>
                    <Text style = {styles.btnText}>View Medical Record</Text>
                </TouchableOpacity>

            </View>
            
            
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
    paw: {
        width: 300,
        height: 300,
        marginTop: -40,
        marginLeft: 150,
    },
    bone: {
        width: 120,
        height: 120,
        marginLeft: -40,
        marginTop: -200
    },
    petTypeCat: {
        alignSelf: 'center',
        width: 100,
        height: 80,
    },
    petTypeDog: {
        alignSelf: 'center',
        width: 100,
        height: 72,
    },
    back: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginTop: -150
    },
    header: {
        fontSize: 30,
        color: '#504949',
        fontWeight: 'bold',
        borderBottomColor: '#504949',
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    petText:{
        fontSize: 20,
        color: 'black'
    },
    whiteBox: {
        width: Dimensions.get('window').width,
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
        width: 180,
        height: 35,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    btnEdit:{
        backgroundColor: 'brown',
        color: 'white',
        width: 100,
        height: 35,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
})

export default PetDetailsScreen;