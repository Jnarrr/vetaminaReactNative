import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';

const HomeScreen = ( {navigation} ) => {
    const [isLoading, setLoading] = useState(true);
    const [isPetLoading, setPetLoading] = useState(true);
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
        setPetLoading(false);
        }
    }

    const showRecentAppointment = () => {
        while(isLoading){
            return (<ActivityIndicator size="large" color="green"></ActivityIndicator>);
        }
        if ( data.length == 0 ) {
            return (
                <View>
                    <Text style = {{ fontSize: 20, color: 'gray', justifyContent: 'center', textAlign: 'center', marginTop: 25, marginBottom: 25 }}> 
                        Book your first appointment! 
                    </Text>
                    <TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('Search') }>
                        <Text style = {styles.btnText}>Find Clinic</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('AppointmentDetails', {item:item})}>
                    <Text style = {styles.header2}>{item.clinic_name}</Text>
                    <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 3}}/>
                    <Text style = {styles.description}>{item.date}{'          '}{item.time}</Text>
                    <Text style = {styles.description}>Status: {item.status}</Text>
                </TouchableOpacity>
                
                )}
            />
            )
        }
    }

    const showRecentPet = () => {
        while(isPetLoading){
            return (<ActivityIndicator size="large" color="green"></ActivityIndicator>);
        }
        if ( petdata.length == 0 ) {
            return (
                <View>
                    <Text style = {{ fontSize: 20, color: 'gray', justifyContent: 'center', textAlign: 'center', marginTop: 25, marginBottom: 25 }}> 
                        You Don't Have a Pet? {'\n'}
                        Add Your First Pet!
                    </Text>
                    <TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('AddPet') }>
                        <Text style = {styles.btnText}>Add Pet</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
            <FlatList
                data={petdata}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('PetDetails', {item:item})}>
                    <Text style = {styles.header2}>{item.pet_name}</Text>
                    <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 3}}/>
                    <Text style = {styles.description}>{item.pet_type}</Text>
                    <Text style = {styles.description2}>{item.pet_birthdate}</Text>
                    <Text style = {styles.description}>{item.pet_breed}</Text>
                    <Text style = {styles.description2}>{item.pet_sex}</Text>
                </TouchableOpacity>
                )}
            />
            )
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
    }, [global.id]);

    return(
        <View style = {{ flex: 1, padding: 30 }}>
            <Text style = {styles.header}>Hello {global.username}</Text>
            <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10}}>
                <Text style = {{ color: 'gray', position: 'absolute', right: 10, bottom: 0.5 }}>Recent Appointments</Text>
            </View>
            {showRecentAppointment()}
            <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10}}>
                <Text style = {{ color: 'gray', position: 'absolute', right: 10, bottom: 0.5 }}>Recent Pets</Text>
            </View>
            {showRecentPet()}
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
    borderTopColor: 'green',
    borderTopWidth: 3
    },
    header: {
    fontSize: 30,
    marginLeft: -15,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold',
    marginBottom: 25
    },
    header2: {
    fontSize: 22,
    color: 'rgb(80, 140, 2)',
    fontWeight: 'bold'
    },
    description: {
    fontSize: 18,
    color: 'black',
    },
    description2: {
    fontSize: 18,
    color: 'black',
    marginTop: -25,
    marginLeft: 150
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
    width: 150,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 100
    },
});

export default HomeScreen;