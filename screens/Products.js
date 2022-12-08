import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Dimensions} from 'react-native';

const ProductsScreen = ( {navigation} ) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const colNum = 2;
    const WIDTH = Dimensions.get('window').width;

    const [search, setSearch] = useState('');

    const [filtereddata, setFilteredData] = useState([]);
    const [masterdata, setMasterData] = useState([]);

    const searchFilter = (text) => {
        if (text) {
            const newData = masterdata.filter((item) => {
                const itemData = item.product_name ?
                                item.product_name.toUpperCase()
                                : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearch(text);
        } else {
            setFilteredData(masterdata);
            setSearch(text);
        }
    }

    const fetchProducts = () => {
        const apiURL = `http://localhost:8000/api/all-products`;
        fetch(apiURL)
        .then((response) => response.json())
        .then((responseJson) => {
            setFilteredData(responseJson.products);
            setMasterData(responseJson.products);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setLoading(false);
        })
    }

    const refresh =  () => {
        setLoading(true);
        fetchProducts();
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return(
        <View style = {{ padding: 30 }}>
          <TextInput 
                style = {styles.input} 
                placeholder = 'Search name of a product' 
                placeholderTextColor = 'gray'
                value = {search}
                onChangeText = { (text) => searchFilter(text) }
                >
          </TextInput>
          <Image source = { require('../images/search.png')} style = {styles.icon}/>
          {isLoading ? <ActivityIndicator size="large" color="green" style = {{ marginTop: 207, marginBottom: 207 }}/> : (
          <FlatList
              style = {{ height: 480 }}
              data={filtereddata}
              keyExtractor={({ id }, index) => [id, index.toString()]}
              renderItem={({ item }) => (
              <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('ProductDetails', {item:item})}>
                  <Text style = {styles.header2}>{item.product_name}</Text>
                  <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, margin: 3}}/>
                  <Text style = {styles.description}>{item.product_description}</Text>
                  <Text style = {styles.description2}>₱ {item.product_price}</Text>
              </TouchableOpacity>
              )}
              numColumns = {colNum}
          />
          )}

            <TouchableOpacity style = {styles.refresh} onPress={ refresh }>
                <Text style = {{ fontSize: 16, color: 'white' }}>Refresh</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    height: 150,
    width: Dimensions.get('window').width / 2,
    margin: 5,
    flex: 1,
    borderTopColor: 'green',
    borderTopWidth: 3
    },
    refresh: {
    position: 'absolute',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: -30,
    backgroundColor: 'brown',
    borderRadius: 50,
    },
    input: {
    padding: 2,
    height: 40,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    shadowRadius: 10,
    fontSize: 14,
    textAlign:'center',
    color: 'black',
    },
    icon: {
    width:20,
    height:20,
    marginLeft: 30,
    marginTop: -30,
    marginBottom: 10,
    },
    header: {
    fontSize: 20,
    marginLeft: -15,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
    header2: {
    fontSize: 20,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
    description: {
    fontSize: 18,
    color: 'gray',
    },
    description2: {
    position: 'absolute',
    fontSize: 16,
    color: 'white',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgb(80, 140, 2)',
    borderRadius: 10,
    width: 75,
    textAlign: 'center'
    },
});

export default ProductsScreen;