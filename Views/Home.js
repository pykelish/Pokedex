import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SvgUri } from "react-native-svg";
import PokemonLogo from "../assets/icons/PokemonLogo";
import SearchInput from "../Components/SearchInput";
import Poke_Requests from "../models/Poke_Request";
import { useState } from "react";
import { useEffect } from "react";

export default Home = ({ navigation }) => {
  const [generations, setGenerations] = useState([]);
  const [pokemonsGenerations, setPokemonsGenerations] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getGenerations = async () => {
      setGenerations(await Poke_Requests.getAllGenerations());
      setPokemon(await Poke_Requests.getAllPokemons());
    };

    getGenerations();
    // console.log(pokemon);
  }, []);

  useEffect(() => {
    renderList();
  }, [generations]);

  const filterPokemon = (input) => {
    // console.log("filtro: " + filter);
    // console.log();
    if (filter) {
      return pokemon.results.filter((e) =>
        e.name.trim().toLowerCase().includes(filter)
      );
    }
    return [];
  };

  const onTextChange = (input) => {
    setFilter(input.trim().toLowerCase());
    // console.log(filter);
  };

  const renderList = async () => {
    if (generations && generations.results) {
      const promises = generations.results.map(async (generation, index) => {
        let name = (
          generation.name[0].toUpperCase() + generation.name.slice(1)
        ).split("-");
        name[1] = name[1].toUpperCase();
        name = name.join(" ");

        const generationsDetail = await Poke_Requests.getGenerationDetailsId(
          index + 1
        );

        let images = [];

        await Promise.all(
          generationsDetail.pokemon_species
            .slice(0, 3)
            .map(async (specie, index) => {
              const speciesDetails = await Poke_Requests.getPokemonSpecieDetail(
                specie.name
              );
              const pokemon = await Poke_Requests.getPokemon(
                speciesDetails.varieties[0].pokemon.name
              );

              images.push(pokemon.sprites.other['official-artwork'].front_default);
            }) 
        );

        return {
          name,
          images,
        };
      });

      const pokemonsGenerationsData = await Promise.all(promises);
      setPokemonsGenerations(pokemonsGenerationsData);
      // console.log(pokemonsGenerationsData);
    }
  };

  return (
    <>
      <View style={styles.icon}>
        <PokemonLogo color="#e1f5f5" />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={{ display: "flex", gap: 30 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>What Pokemon</Text>
              <Text style={styles.title}>are you looking for?</Text>
            </View>

            <SearchInput
              onChangeText={onTextChange}
              placeholder="Search Pokemon"
            ></SearchInput>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                // height: 300,
                // backgroundColor: "red",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              {/* Recordar transformar esto en componente */}
              {pokemonsGenerations && !filter
                ? pokemonsGenerations.map((detail, index) => (
                    <View
                      key={index}
                      style={{
                        width: "48%",
                        backgroundColor: "#f9f9f9",
                        padding: 30,
                        borderRadius: 10,
                        // borderWidth: 1,
                        // borderColor: "rgba(0,0,0,0.15)",
                        shadowColor: "black",
                        shadowOffset: {
                          width: 100,
                          height: 100,
                        },
                        elevation: 4,
                        shadowOpacity: 0.25,
                        marginBottom: 20,
                        display: "flex",
                        // alignItems: 'baseline',
                        // justifyContent: "flex-start",

                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          width: 80,
                          height: 80,
                          right: -20,
                          bottom: -10,
                        }}
                      >
                        <PokemonLogo color="#e9e5e5" />
                      </View>

                      <Text style={{ fontWeight: "900", textAlign: "center" }}>
                        {detail.name}
                      </Text>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",

                          gap: -15,
                        }}
                      >
                        {detail.images.map((image, index) => (
                          <Image
                            style={{
                              height: 60,
                              width: 60,
                              position: "relative",
                              top: 15,
                              objectFit: "contain",
                              // backgroundColor: "blue",
                            }}
                            key={index}
                            source={{ uri: image }}
                          />
                        ))}
                      </View>
                    </View>
                  ))
                : filterPokemon().map((pokemon, index) => (
                    <View
                      key={index}
                      style={{
                        width: "48%",
                        backgroundColor: "#f9f9f9",
                        padding: 20,
                        borderRadius: 10,
                        // borderWidth: 1,
                        // borderColor: "rgba(0,0,0,0.15)",
                        shadowColor: "black",
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        elevation: 4,
                        shadowOpacity: 0.25,
                        marginBottom: 20,
                        display: "flex",
                        // alignItems: 'baseline',
                        // justifyContent: "flex-start",

                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          width: 80,
                          height: 80,
                          right: -20,
                          bottom: -10,
                        }}
                      >
                        <PokemonLogo color="#e9e5e5" />
                      </View>

                      <Text style={{ fontWeight: "900", textAlign: "center" }}>
                        {pokemon.name}
                      </Text>

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",

                          gap: -50,
                        }}
                      >
                        {/* {detail.images.map((image, index) => (
                          <Image
                            style={{
                              height: 100,
                              width: 100,
                              position: "relative",
                              top: 10,
                              objectFit: "cover",
                              // backgroundColor: "blue",
                            }}
                            key={index}
                            source={{ uri: image }}
                          />
                        ))} */}
                      </View>
                    </View>
                  ))}
              {/* FIN: Transformar en componente */}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },

  content: {
    marginTop: 100,
    paddingHorizontal: 15,
    display: "flex",
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0a1b2b",
  },

  titleContainer: {},
  icon: {
    width: 240,
    height: 240,
    position: "absolute",
    right: -60,
    top: -80,
    // zIndex: 1
  },
});
