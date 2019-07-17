import { createStackNavigator } from "react-navigation";
import {
  LoginScreen,
  HomeScreen,
  CameraScreen,
  CameraExample,
  CameraBasic
} from ".";

const AppNavigator = createStackNavigator(
  {
    LoginScreen,
    HomeScreen,
    CameraScreen,
    CameraExample,
    CameraBasic
  },
  {
    initialRouteName: "CameraBasic"
    // initialRouteName: "LoginScreen"
    // initialRouteName: "CameraScreen"
    // initialRouteName: "HomeScreen"
    // initialRouteName: "CameraExample"
  }
);

export default AppNavigator;
