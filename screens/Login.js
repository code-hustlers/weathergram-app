import React from "react";
import { Container, Text, Icon } from "native-base";
// import { Constants } from "expo";
// import withTopNavigator from "../components/withTopNavigator";

const Login = () => {
  return (
    <Container>
      <Text>Login</Text>
    </Container>
  );
};

Login.navigationOptions = ({ navigation }) => ({
  // headerStyle: { marginTop: Constants.statusBarHeight }
  // headerForceInset: { top: "never", bottom: "never" }
  // headerStyle: { marginTop: 30 },
  headerMode: "none",
  headerLeft: (
    <Icon
      name="ios-camera"
      style={{ paddingLeft: 16 }}
      onPress={() => navigation.navigate("CameraScreen")}
      // onPress={() => alert(1)}
    />
  ),
  title: "Weathergram",
  headerRight: <Icon name="ios-send" style={{ paddingRight: 16 }} />
});

export default Login;
