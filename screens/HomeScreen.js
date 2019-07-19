import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, StyleSheet, ScrollView } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  View
} from "native-base";
import env from "../.env";

// const HomeScreen = ({ navigation }) => {
const user_seq = 10;

const HomeScreen = () => {
  // console.log("TCL: HomeScreen -> props", props);
  // const { user_seq } = navigation.state.params;
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
    uri: null
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    fetch(`${env.API_URL}/photo`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(resJson => {
        // console.log("TCL: login -> resJson", resJson);
        // const { photo_seq, photo_contents, photo_binary } = resJson;
        setState({ ...state, loading: false, data: resJson });
      })
      .catch(error => {
        console.error(error);
        setState({ ...state, loading: false, error });
      });
  }, []);

  const { loading, error, data, uri } = state;
  const { container, card, image } = styles;

  // if (loading) {
  //   console.log("TCL: HomeScreen -> loading", loading);
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // } else if (error) {
  //   console.log("TCL: HomeScreen -> error", error);
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // } else if () {
  return (
    <ScrollView style={container}>
      <Image source={{ uri }} style={image} />
      {loading && (
        <View>
          <Text>Loading</Text>
        </View>
      )}
      {error && (
        <View>
          <Text>Error</Text>
        </View>
      )}
      {!loading &&
        !error &&
        data &&
        data.map((value, index) => (
          <Card key={index} style={card}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: "Image URL" }} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{ uri: value.photo_binary }} style={image} />
                <Text>{value.photo_contents}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="logo-github" />
                  <Text>{value.photo_seq} stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        ))}
    </ScrollView>
  );
};

const handleRightClick = () => {
  ImagePicker.launchImageLibraryAsync().then(({ uri }) => {
    setState({ uri });
    fetch(`${env.API_URL}/photo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: JSON.stringify({
        file: uri,
        photo_contents: "컨텐츠",
        photo_location: "#Suwon",
        tags: "#요미",
        user_seq
      })
    }).then(res => {
      console.log("TCL: handleRightClick -> res", res);
    });
  });
};

HomeScreen.navigationOptions = ({ navigation: { navigate } }) => ({
  title: "Weathergram",
  // headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center"
  },
  headerLeft: (
    <Icon
      name="ios-camera"
      style={{ paddingLeft: 16 }}
      onPress={() => navigate("CameraExample")}
      // onPress={() => navigate("CameraScreen")}
    />
  ),
  headerRight: (
    <Icon
      type="AntDesign"
      name="picture"
      style={{ paddingRight: 16 }}
      onPress={handleRightClick}
    />
  )
});

const styles = StyleSheet.create({
  container: {
    margin: 8
  },
  card: {
    margin: 8
  },
  image: {
    width: 300,
    height: 300
  }
});

export default HomeScreen;
