import React, { useEffect, useState } from 'react';
import {View, Button, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import PetItem from '../components/petContainer';

const PetsScreen = ( {navigation} ) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPets = async () => {
    try {
    const response = await fetch(`http://localhost:8000/api/pets/${id}`);
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

  return (
    <View style = {{ padding: 30 }}>
      <Text style = { styles.header }>Your Pets</Text>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            style = {{ height: 450 }}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity style = {styles.item} onPress={ () => navigation.navigate('PetDetails', {item:item})}>
                <Text style = {styles.header2}>{item.pet_name}</Text>
                <Text style = {styles.divider}>________________________________</Text>
                <Text style = {styles.description}>{item.pet_type}</Text>
                <Text style = {styles.description2}>{item.pet_birthdate}</Text>
                <Text style = {styles.description}>{item.pet_breed}</Text>
                <Text style = {styles.description2}>{item.pet_sex}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      <TouchableOpacity style = {styles.refresh} onPress={ refresh }>
        <Text style = {{ fontSize: 16, color: 'white' }}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.addButton} onPress={ () => navigation.navigate('AddPet')}>
        <Text style = {{ fontSize: 30, color: 'white' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    addButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: -50,
    backgroundColor: '#15D005',
    borderRadius: 50,
    },
    refresh: {
    position: 'absolute',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: -50,
    backgroundColor: 'brown',
    borderRadius: 50,
    },
})

export default PetsScreen;