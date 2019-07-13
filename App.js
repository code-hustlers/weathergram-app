import React from "react";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./screens/AppNavigator";
// import AppNavigator from "./screens/AppNavigator";

const AppContainer = createAppContainer(AppNavigator);

function App() {
  return <AppContainer />;
}

App.navigationOptions = props => ({
  title: "Home",
  headerStyle: {
    backgroundColor: "#f4511e"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold"
  }
});

export default App;
