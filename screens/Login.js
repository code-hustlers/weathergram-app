import React, { useState } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Icon,
  Form,
  Item,
  Label,
  Input,
  Button
} from "native-base";
import { StyleSheet } from "react-native";

// import { Constants } from "expo";
// import withTopNavigator from "../components/withTopNavigator";

const Login = () => {
  const [email, setEmail] = useState("");
  const login = () => {
    fetch(`${process.env.API_URL}/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_name: email
      })
    })
      .then(res => res.json())
      .then(resJson => {
        console.log("TCL: login -> resJson", resJson);
      })
      .catch(error => console.error(error));
  };

  const { container, header, button, label, input } = styles;

  return (
    <Container style={container}>
      {/* <Header /> */}
      <Content>
        <Card>
          <CardItem style={header} header>
            <Text>Login</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Form style={{ flex: 1, alignSelf: "stretch" }}>
                <Item floatingLabel>
                  <Label style={label}>Email</Label>
                  <Input
                    style={input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                  />
                </Item>
                <Button style={button} onPress={login}>
                  <Text>Button</Text>
                </Button>
              </Form>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Login.navigationOptions = ({ navigation }) => ({
  // headerStyle: { marginTop: Constants.statusBarHeight }
  // headerForceInset: { top: "never", bottom: "never" }
  // headerStyle: { marginTop: 30 },
  // headerMode: "none",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8
  },
  header: {
    display: "flex",
    justifyContent: "center"
  },
  label: {
    padding: 8
  },
  input: {
    marginTop: 8,
    padding: 8
  },
  button: {
    margin: 16,
    alignSelf: "stretch",
    textAlign: "center",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center"
  }
});

export default Login;
