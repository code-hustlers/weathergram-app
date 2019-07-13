import { createStackNavigator } from "react-navigation";
import { Login, Home, CameraScreen } from ".";

const AppNavigator = createStackNavigator(
  {
    Login,
    Home,
    CameraScreen
  },
  {
    initialRouteName: "Login"
  }
);

export default AppNavigator;
