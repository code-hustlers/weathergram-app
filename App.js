import React, { useState } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./screens/AppNavigator";

const AppContainer = createAppContainer(AppNavigator);

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppContainer />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font
  });
  // await Promise.all([
  //   Asset.loadAsync([
  //     require("./assets/images/robot-dev.png"),
  //     require("./assets/images/robot-prod.png")
  //   ]),
  //   Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //     ...Ionicons.font
  //     // We include SpaceMono because we use it in HomeScreen.js. Feel free to
  //     // remove this if you are not using it in your app
  //     // "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
  //   })
  // ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

// App.navigationOptions = props => ({
//   title: "Home",
//   headerStyle: {
//     backgroundColor: "#f4511e"
//   },
//   headerTintColor: "#fff",
//   headerTitleStyle: {
//     fontWeight: "bold"
//   }
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default App;
