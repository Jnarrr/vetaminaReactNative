import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList, Dimensions} from 'react-native';

const AppointmentDetailsScreen = ( {navigation, route} ) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    const getPets = async () => {
      try {
      const response = await fetch(`http://localhost:8000/api/onePet/${route.params.item.pet}`);
      const json = await response.json();
      setData(json.pets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    const refresh =  () => {
      setLoading(true);
      getPets();
    }
  
    useEffect(() => {
      getPets();
    }, []);   

    testFunc = ({text}) => {
      if (text == "Declined"){
        return (<Text style = { styles.statusRed }>{route.params.item.status}</Text>);
      }else if (text == "Approved") {
        return (<Text style = { styles.statusGreen }>{route.params.item.status}</Text>)
      } else {
        return (<Text style = { styles.status }>{route.params.item.status}</Text>)
      }
    }

    return(
        <View style = { styles.body }>
            <Image source = { require('../images/paw.png')} style = {styles.paw}/>
            <Image source = { require('../images/bone.png')} style = {styles.bone}/>
            <TouchableOpacity activeOpacity={.5} onPress={ () => navigation.goBack()} style = {{ marginBottom: -80 }}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <View style = {styles.whiteBox}>
            <Text style = { styles.header }>{route.params.item.clinic_name}</Text>
            {testFunc({text: route.params.item.status})}
            <Image source = { require('../images/pin.png')} style = {styles.pin}/>
            <Text style = { styles.semiHeader }>{route.params.item.clinic_address}</Text>
            <Image source = { require('../images/calendar.png')} style = {styles.email}/>
            <Text style = { styles.semiHeader }>{route.params.item.date}</Text>
            <Image source = { require('../images/date.png')} style = {styles.email}/>
            <Text style = { styles.semiHeader }>{route.params.item.time}</Text>
            <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10}}>
                <Text style = {{ color: 'gray' }}>Included Pet</Text>
            </View>
            {isLoading ? <ActivityIndicator size="large" color="green"/> : (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <View>
                    <Text style = { styles.header }>{item.pet_name}</Text>
                    <Text style = {styles.description}>Type: {item.pet_type}</Text>
                    <Text style = {styles.description}>Breed: {item.pet_breed}</Text>
                    <Text style = {styles.description}>Weight: {item.pet_weight}</Text>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10}}>
                        <Text style = {{ color: 'gray' }}>Procedure</Text>
                    </View>
                    <Text style = {styles.header}>{route.params.item.procedure}</Text>
                </View>
                )}
            />
            )}
            

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
    backgroundColor: 'rgb(109, 169, 22)',
    flex: 1,
    fontFamily: 'Roboto',
    },
    item: {
    backgroundColor: 'green',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    height: 120,
    },
    pin:{
    width: 18,
    height: 22,
    },
    email:{
    width: 22,
    height: 22,
    },
    status:{
    color: 'rgb(73, 80, 74)',
    marginTop: -60,
    marginLeft: 220,
    fontSize: 14,
    marginBottom: 45
    },
    statusRed:{
    color: 'red',
    marginTop: -60,
    marginLeft: 220,
    fontSize: 14,
    marginBottom: 45,
    fontWeight: 'bold'
    },
    statusGreen:{
    color: 'green',
    marginTop: -60,
    marginLeft: 220,
    fontSize: 14,
    marginBottom: 45,
    fontWeight: 'bold'
    },
    semiHeader:{
    color: 'rgb(73, 80, 74)',
    marginTop: -24,
    marginLeft: 30,
    fontSize: 18,
    marginBottom: 10,
    },
    description:{
    fontSize: 18,
    color: 'gray',
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
    back: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginTop: -150
    },
    whiteBox: {
    width: Dimensions.get('window').width,
    height: 500,
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
    header: {
    fontSize: 30,
    color: 'rgb(80, 140, 2)',
    marginBottom: 10,
    fontWeight: 'bold'
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
    petText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
    },
});

export default AppointmentDetailsScreen;