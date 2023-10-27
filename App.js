import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=100000&offset=0.";
const apiUrl = `${pokePath}${pokeQuery}`;


export default function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(apiUrl);
      setPokemons(await response.json());
    };

    fetchPokemons();
  }, []);

  console.log(pokemons);



  return (

    <View style={styles.container}>
      <Text> Sexo</Text>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
