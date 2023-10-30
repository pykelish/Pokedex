import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default Header = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const canGoBack = navigation.canGoBack();

  const renderControls = () => {
    return canGoBack ? (
      <TouchableWithoutFeedback onPress={() => handleGoBack}>
        <Icon size={30} name="arrow-back" />
      </TouchableWithoutFeedback>
    ) : (
      <Text></Text>
    );
  };

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <View style={styles.header}>
        <View style={[styles.headerLeft, styles.bothSides]}>
          {renderControls()}
        </View>
        <View style={[styles.headerRight, styles.bothSides]}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "rgba(0,0,0,0)",
    // width: '100%',
    marginTop: 40,
    height: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  bothSides: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerLeft: {
    // backgroundColor: "red",
  },
  headerRight: {
    // backgroundColor: "blue",
  },
});
