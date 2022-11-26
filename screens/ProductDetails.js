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
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = { styles.petText }>Product Details View</Text>
            {isLoading ? <ActivityIndicator size="large" color="green"/> : (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <View>
                    <Text style = {styles.petText}>{item.clinic_name}</Text>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth}}/>
                    <Text style = {styles.petText}>{item.address}</Text>
                    <Text style = { styles.petText }>{route.params.item.product_name}</Text>
                    <Text style = { styles.petText }>₱{route.params.item.product_price}</Text>
                    <Text style = { styles.petText }>Description: {route.params.item.product_description}</Text>
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
    petText:{
        fontSize: 20,
        color: 'black'
    },
})

export default ProductDetailsScreen;