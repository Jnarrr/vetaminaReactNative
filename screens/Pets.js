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
            style = {{ height: 550 }}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={ () => navigation.navigate('AddPet')}>
              <Text style = {styles.petText}>{item.pet_name}, {item.pet_type}</Text>
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
    petText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
    },
    header: {
    fontSize: 30,
    marginLeft: -15,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
    addButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
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
    bottom: 30,
    backgroundColor: 'brown',
    borderRadius: 50,
    },
})

export default PetsScreen;