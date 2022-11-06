import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';

export default function RadioButton() {
    const [userOption, setUserOption] = useState(null);
    const data = [
        { key: '1', value: 'Nearby' },
        { key: '2', value: 'Popular' },
        { key: '3', value: 'Last Visited' },
    ];

    return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        {data.map((item) => {
            return(
            <Pressable
            style={
                item.value === userOption ? styles.selected : styles.unselected
            }
            onPress={() => setUserOption(item.value)}
            >
                <Text style={styles.option}> {item.value}</Text>
            </Pressable>
            );
        })}
    </View>

    );
}

const styles = StyleSheet.create({
    option: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    },
    unselected: {
    backgroundColor: 'gray',
    color: 'white',
    margin: 6,
    padding: 8,
    borderRadius: 10,
    },
    selected: {
    backgroundColor: '#6DA916',
    color: 'white',
    margin: 6,
    padding: 8,
    borderRadius: 10,
    },
})