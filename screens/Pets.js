import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import PetItem from '../components/petContainer';

function PetsScreen( {navigation} ) {
  return (
    <View style = {{ padding: 30 }}>
      <Text style = { styles.header }>Your Pets</Text>
      <ScrollView style = {{ height: 550 }}>
          <PetItem />
          <PetItem />
          <PetItem />
          <PetItem />
          <PetItem />
      </ScrollView>
      <TouchableOpacity>
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
  fontSize: 30,
  marginLeft: -15,
  color: 'rgb(73, 80, 74)',
  fontWeight: 'bold'
  },
})

export default PetsScreen;