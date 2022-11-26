import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';

const ProductDetailsScreen = ( {navigation, route} ) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getClinic = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/oneClinic/${route.params.item.clinic_id}`);
        const json = await response.json();
        setData(json.oneClinic);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        getClinic();
    }, []);

    return(
        <View style = {{ flex: 1, padding: 30 }}>
            {isLoading ? <ActivityIndicator size="large" color="green"/> : (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <View>
                    <View style = {styles.square}> 
                        <Text style = { styles.header }>{route.params.item.product_name}</Text>
                        <Text style = { styles.price }>₱ {route.params.item.product_price}</Text>
                        <Text style = { styles.description }>{route.params.item.product_description}</Text>
                    </View>
                    <View style={{borderBottomColor: 'green', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20}}/>
                    <Text style = {styles.petText}>{item.clinic_name}</Text>
                    <Text style = {styles.petText}>{item.address}</Text>
                    <Text style = {styles.petText}>{item.email}</Text>
                    <Text style = {styles.petText}>{item.phone_number}</Text>
                    <TouchableOpacity style = {{ width: 100, height:40, backgroundColor: 'black'}} onPress={ () => navigation.navigate('AppointmentDateAndTime', {clinicID:item.id, clinicNAME:item.clinic_name, clinicADDRESS:item.address}) }>
                    </TouchableOpacity>
                </View>
                )}
            />
            )}
            
        </View>
    );
};

const styles = StyleSheet.create({
    square:{
        backgroundColor: 'white',
        width: 300,
        height: 125,
        borderRadius: 20,
        padding: 20,
        borderTopColor: 'green',
        borderTopWidth: 5
    },
    price: {
        marginLeft: 180,
        marginTop: -25,
        color: 'white',
        fontSize: 18,
        backgroundColor: 'green',
        borderRadius: 10,
        textAlign: 'center'
    },
    header: {
        color: 'rgb(73, 80, 74)',
        fontSize: 30,
        fontWeight: 'bold' 
    },
    description:{
        fontSize: 18,
        color: 'gray',
        marginTop: 10,
    },
    subHeader:{
        color: 'rgb(73, 80, 74)',
        fontSize: 24,
        fontWeight: 'bold' 
    },
})

export default ProductDetailsScreen;