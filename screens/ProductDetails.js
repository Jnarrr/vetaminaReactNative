import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image} from 'react-native';

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

                        <View style={{borderBottomColor: 'green', borderBottomWidth: StyleSheet.hairlineWidth, margin: 10}}/>
                        
                        <Text style = {styles.header}>{item.clinic_name}</Text>
                        <Image source = { require('../images/pin.png')} style = {styles.pin}/>
                        <Text style = { styles.semiHeader }>{item.address}</Text>
                        <Image source = { require('../images/email.png')} style = {styles.email}/>
                        <Text style = { styles.semiHeader }>{item.email}</Text>
                        <Image source = { require('../images/phone.png')} style = {styles.email}/>
                        <Text style = { styles.semiHeader }>{item.phone_number}</Text>
                        {/*<TouchableOpacity style = { styles.btn } onPress={ () => navigation.navigate('AppointmentDateAndTime', {clinicID:item.id, clinicNAME:item.clinic_name, clinicADDRESS:item.address}) }>
                            <Text style = {styles.btnText}>Appoint now</Text>
                        </TouchableOpacity>*/}
                    </View>
                    
                    
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
        height: 330,
        borderRadius: 20,
        padding: 20,
        borderTopColor: 'green',
        borderTopWidth: 5
    },
    price: {
        marginLeft: 180,
        marginTop: -25,
        color: 'white',
        fontSize: 16,
        backgroundColor: 'green',
        borderRadius: 10,
        textAlign: 'center'
    },
    header: {
        color: 'rgb(73, 80, 74)',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
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
    btn:{
        backgroundColor: 'rgb(80, 140, 2)',
        color: 'white',
        width: 260,
        height: 35,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 30,
    },
    btnText:{
        color: 'white',
        fontSize: 14,
        padding: 8,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pin:{
        width: 18,
        height: 22,
        marginTop: 5
    },
    email:{
        width: 21,
        height: 18,
        marginTop: 5
    },
    semiHeader:{
        color: 'rgb(73, 80, 74)',
        marginTop: -24,
        marginLeft: 40,
        fontSize: 18,
        marginBottom: 10,
    },
})

export default ProductDetailsScreen;