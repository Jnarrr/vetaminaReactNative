import React, { useState, useEffect } from "react";
import {Box, FlatList, Center, NativeBaseProvider, Text} from 'react-native';

const CoffeeAutonomous = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("http://localhost:8000/api/clinics");
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  const renderItem = ({ item }) => {
    return (
      <Text>
        {item.title}
      </Text>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <NativeBaseProvider>
      <Center flex={1}>
      <Box> Fetch API</Box>
        {loading && <Box>Loading..</Box>}
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </Center>
    </NativeBaseProvider>
  );
};

export default CoffeeAutonomous;