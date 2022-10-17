import React, { useEffect, useState } from 'react';
import {View, Button, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, VirtualizedList} from 'react-native';
import PetItem from '../components/petContainer';

const PetsScreen = ( {navigation} ) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPets = async () => {
    try {
    const response = await fetch('http://localhost:8000/api/pets');
    const json = await response.json();
    setData(json.pets);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
              <Text style = {styles.petText}>{item.pet_name}, {item.pet_type}</Text>
            )}
          />
        )}
      <TouchableOpacity style = {styles.addButton} onPress={ () => navigation.navigate('AddPet')}>
        <Text style = {{ fontSize: 30 }}>+</Text>
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
})

export default PetsScreen;