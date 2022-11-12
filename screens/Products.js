import React from 'react';
import {View, Button, Text} from 'react-native';

const ProductsScreen = ( {navigation} ) => {
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 20, color: 'black'}}>Products View</Text>
        </View>
    );
};

export default ProductsScreen;