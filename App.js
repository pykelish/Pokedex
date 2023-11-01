import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Views/Home";
import Header from "./Template/Header";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
        <Stack.Navigator
          screenOptions={{
            header: () => <Header />,
            headerTransparent: true,
            contentStyle: {
              marginTop: 30,
              backgroundColor: 'white'
            }
          }}
        >
          <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
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
