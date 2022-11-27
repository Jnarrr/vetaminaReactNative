import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

const HomeScreen = ( {navigation} ) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [petdata, setPetData] = useState([]);

    const getAppointments = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/recentAppointment/${id}`);
        const json = await response.json();
        setData(json.appointments);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    const getPets = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/recentPet/${id}`);
        const json = await response.json();
        setPetData(json.pets);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
    }
    
    const refresh = () => {
        setLoading(true);
        getAppointments();
        getPets();
    }

    useEffect(() => {
        getAppointments();
        getPets();
    }, []);

    return(
        <View style = {{ flex: 1, padding: 30 }}>
            <Text style = {styles.header}>Hello {global.username}</Text>
            <Text style = {{ fontSize: 20, color: 'black'}}>My recent Appointment</Text>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('AppointmentDetails', {item:item})}>
                    <Text style = {styles.header2}>{item.clinic_name}</Text>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 3}}/>
                    <Text style = {styles.description}>{item.date}{'          '}{item.time}</Text>
                    <Text style = {styles.description}>Status: {item.status}</Text>
                </TouchableOpacity>
                
                )}
            />
            )}
            <Text style = {{ fontSize: 20, color: 'black'}}>My Recent Added Pet</Text>
            {isLoading ? <ActivityIndicator size="large" color="green"/> : (
            <FlatList
                data={petdata}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('PetDetails', {item:item})}>
                    <Text style = {styles.header2}>{item.pet_name}</Text>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 3}}/>
                    <Text style = {styles.description}>{item.pet_type}</Text>
                    <Text style = {styles.description2}>{item.pet_birthdate}</Text>
                    <Text style = {styles.description}>{item.pet_breed}</Text>
                    <Text style = {styles.description2}>{item.pet_sex}</Text>
                </TouchableOpacity>
                )}
            />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    height: 120,
    },
    header: {
    fontSize: 30,
    marginLeft: -15,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
});

export default HomeScreen;