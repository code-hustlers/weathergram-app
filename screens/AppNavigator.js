import { createStackNavigator } from "react-navigation";
import { LoginScreen, HomeScreen, CameraScreen } from ".";

const AppNavigator = createStackNavigator(
  {
    LoginScreen,
    HomeScreen,
    CameraScreen
  },
  {
    // initialRouteName: "LoginScreen"
    initialRouteName: "HomeScreen"
  }
);

export default AppNavigator;
