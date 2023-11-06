import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Views/Home";
import Header from "./Template/Header";
import { createContext, useEffect, useState } from "react";
import Poke_Requests from "./models/Poke_Request";

const Stack = createNativeStackNavigator();

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [groupedByGeneration, setGroupedByGeneration] = useState({});
  const [loading, setLoading] = useState(true);
  const DataContext = createContext();

  useEffect(() => {
    const getGeneration = async () => {
      let pokemonDataAux = [];
      const { results: generations } = await Poke_Requests.getAllGenerations();

      // La generacion tiene que agregarse al objeto final
      await Promise.all(
        generations.map(async (generation, index) => {
          const { pokemon_species } =
            await Poke_Requests.getGenerationDetailsId(index + 1);
          pokemonDataAux[generation.name] = [];

          await Promise.all(
            pokemon_species.map(async (pokemon_specie) => {
              const { varieties } = await Poke_Requests.getPokemonSpecieDetail(
                pokemon_specie.name
              );

              await Promise.all(
                varieties.map(async ({ pokemon }) => {
                  const request = await Poke_Requests.getPokemon(pokemon.name);
                  request["generation"] = generation.name;

                  if (pokemonDataAux.length < 50) {
                    pokemonDataAux.push(request);
                    if (pokemonDataAux.length < 50) return;
                  }

                  setPokemonData((prevPokemonData) => [
                    ...prevPokemonData,
                    ...pokemonDataAux,
                  ]);
                  pokemonDataAux = [];
                })
              );
            })
          );
        })
      );

      if (pokemonDataAux.length > 0) {
        setPokemonData((prevPokemonData) => [
          ...prevPokemonData,
          ...pokemonDataAux,
        ]);

        setLoading(false);
      }

      // groupByGeneration();
    };

    // getPokemonData();
    getGeneration();
    // groupByGeneration();
  }, []);

  // useEffect(() => {
  //   setGroupedByGeneration({});
  //   const groupByGeneration = () => {
  //     const groupedData = pokemonData.reduce((result, pokemon) => {
  //       if (!result[pokemon.generation]) {
  //         result[pokemon.generation] = [];
  //       }

  //       result[pokemon.generation].push(pokemon);
  //       return result;
  //     }, {});

  //     // console.log(groupedData);
  //     // setPokemonData(groupedData);
  //     // setGroupedByGeneration(groupedData);
  //   };

  //   // groupByGeneration();
  // }, [pokemonData]);

  if(loading) {
    return (
      <View style={{display: "flex", height: '100%', justifyContent: "center", alignItems: "center"}}>
        <Text>Loading {(pokemonData.length / 1292).toFixed(2) * 100}%</Text>
      </View>
    )
  } 
  return (
    <DataContext.Provider value={pokemonData}>
        <Text>{pokemonData.length}</Text>
      <NavigationContainer>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{
            header: () => <Header />,
            headerTransparent: true,
            contentStyle: {
              marginTop: 30,
              backgroundColor: "white",
            },
          }}
        >
          <Stack.Screen name="home" component={Home}/>
        </Stack.Navigator>
        {/* </SafeAreaView> */}
      </NavigationContainer>
    </DataContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },
});
