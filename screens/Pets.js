import React, { useState } from 'react';
import {View, Button, Text, StyleSheet, TextInput} from 'react-native';

function PetsScreen( {navigation} ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style = {{ fontSize: 20, color: 'black'}}>Pets View</Text>
      </View>
    );
  }

export default PetsScreen;