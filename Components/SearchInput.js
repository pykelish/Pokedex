import { StyleSheet, TextInput, View } from "react-native";
import SearchIcon from "../assets/icons/SearchIcon";

export default SearchInput = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <SearchIcon></SearchIcon>
      </View>
      <TextInput placeholder={props.placeholder} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f3f3',
    height: 50,
    borderRadius: 80,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 15
  },

  icon: {
    width: 20,
    height: 20,
  },

  input: {
    fontWeight: "bold",
    fontSize: 15,
    flex: 1,
  },
});
