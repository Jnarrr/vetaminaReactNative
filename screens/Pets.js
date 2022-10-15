import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default class PetsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        }
    }

    async getData() {
        try {
            const response = await fetch('http://10.0.2.2:8000/api/pets');
            const json = await response.json();

            this.setState({ data: json.pet })
        }
        catch(error) {
            console.error(error);
        } finally {
            this.setState({ isLoading: false })
        }
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        const { data, isLoading } = this.state;

        return(
            <View style={{ flex: 1, padding: 24 }}>
                { isLoading ? <ActivityIndicator /> : (
                    <FlatList
                        data={ data }
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                        <Text>{item.pet_name}, {item.pet_type}</Text>
                        )}
                        />
                )}
            </View>
        );
    }
}