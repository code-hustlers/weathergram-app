import React from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";

const Home = () => {
  return (
    <View>
      <Text>2233</Text>
    </View>
  );
};

Home.navigationOptions = ({ navigation }) => ({
  title: "Home",
  // headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default Home;
