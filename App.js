import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Views/Home";
import Header from "./Template/Header";
import { useEffect, useState } from "react";
import Poke_Requests from "./models/Poke_Request";

const Stack = createNativeStackNavigator();

export default function App() {
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    const getGeneration = async () => {
      let pokemonDataAux = {};
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

                  if (pokemonDataAux.length < 10) {
                    // if (!pokemonData[generation.name]) {
                    //   console.log("Hola");
                    //   pokemonDataAux[generation.name] = [];
                    // }
                    // pokemonDataAux[generation.name] = pokemonData[generation.name];
                    // pokemonDataAux[generation.name] = [...pokemonData[generation.name], request];
                    // console.log(pokemonDataAux[generation.name]);
                    console.log(pokemonDataAux[generation.name]);
                    if (pokemonDataAux.length < 10) return;
                  }

                  // setPokemonData({ ...pokemonData, ...pokemonDataAux });
                  // pokemonDataAux = [];
                })
              );
            })
          );
          
          // pok
        })
      );

      // if (pokemonDataAux.length > 0) {
      //   setPokemonData((prevPokemonData) => [
      //     ...prevPokemonData,
      //     ...pokemonDataAux,
      //   ]);
      // }
    };

    const groupByGeneration = () => {
      // setPokemonData(pokemonData.reduce((result, pokemon) => {
      //   if(reducedData[result.generation])
      // }))
    };

    // getPokemonData();
    getGeneration();
    groupByGeneration();
  }, []);

  return (
    <NavigationContainer>
      <Text style={{ textAlign: "center" }}>
        {Object.entries(pokemonData).length}
      </Text>
      {/* {console.log(pokemonData.length)}   */}
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      {/* <Stack.Navigator 
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
        <Stack.Screen name="home" component={Home} /> 
      </Stack.Navigator> */}
      {/* </SafeAreaView> */}
    </NavigationContainer>
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
