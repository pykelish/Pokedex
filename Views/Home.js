import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SvgUri } from "react-native-svg";
import PokemonLogo from "../assets/icons/PokemonLogo";
import SearchInput from "../Components/SearchInput";
import Poke_Requests from "../models/Poke_Request";
import { useState } from "react";
import { useEffect } from "react";

export default Home = ({ navigation }) => {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    const getGenerations = async () => {
      setGenerations(await Poke_Requests.getAllGenerations());
    };

    getGenerations();
  }, []);

  const renderList = () => {
    if (generations.results) {
      console.log(generations.results);
      return generations.results.map((generation, index) => {
        generation.name =
          generation.name.charAt(0).toUpperCase() + generation.name.slice(1);
        generation.name = generation.name.replace("-", " ");

        

        console.log(generation.name);
        return (
          <View
            key={index}
            style={{
              width: "49%",
              backgroundColor: "#f9f9f9",
              padding: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.15)",
              marginBottom: 20,
              
            }}
          >
            <Text style={{ fontWeight: "900" }}>{generation.name}</Text>

          </View>
        );
      });
    }
  };

  return (
    <>
      <View style={styles.icon}>
        <PokemonLogo color="#e9e9e9" />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={{ display: "flex", gap: 30 }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>What Pokemon</Text>
              <Text style={styles.title}>are you looking for?</Text>
            </View>

            <SearchInput placeholder="Search Pokemon"></SearchInput>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                backgroundColor: "red",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 5
              }}
            >
              {renderList()}
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
