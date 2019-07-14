import { createStackNavigator } from "react-navigation";
import { LoginScreen, HomeScreen, CameraScreen, CameraExample } from ".";

const AppNavigator = createStackNavigator(
  {
    LoginScreen,
    HomeScreen,
    CameraScreen,
    CameraExample
  },
  {
    initialRouteName: "LoginScreen"
    // initialRouteName: "CameraScreen"
    // initialRouteName: "HomeScreen"
    // initialRouteName: "CameraExample"
  }
);

export default AppNavigator;
