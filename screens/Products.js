import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Dimensions} from 'react-native';

const ProductsScreen = ( {navigation} ) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const colNum = 2;
    const WIDTH = Dimensions.get('window').width;
  
    const getProducts = async () => {
      try {
      const response = await fetch(`http://localhost:8000/api/all-products`);
      const json = await response.json();
      setData(json.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    const refresh =  () => {
      setLoading(true);
      getProducts();
    }
  
    useEffect(() => {
      getProducts();
    }, []);    

    return(
        <View style = {{ padding: 30 }}>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
                style = {{ height: 450 }}
                data={data}
                keyExtractor={({ id }, index) => [id, index.toString()]}
                renderItem={({ item }) => (
                <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('ProductDetails', {item:item})}>
                    <Text style = {styles.header2}>{item.product_name}</Text>
                    <View style={{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth,}}/>
                    <Text style = {styles.description}>{item.product_price}</Text>
                    <Text style = {styles.description}>{item.product_description}</Text>
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
    height: 250,
    height: Dimensions.get('window').width / 2,
    margin: 5,
    flex: 1,
    },
    header: {
    fontSize: 30,
    marginLeft: -15,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
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
    marginLeft: 125
    },
    divider: {
    fontSize: 20,
    color: 'gray',
    marginTop: -20,
    },
    refresh: {
    position: 'absolute',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: -86.5,
    backgroundColor: 'brown',
    borderRadius: 50,
    },
});

export default ProductsScreen;