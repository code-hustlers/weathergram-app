import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  snap = async () => {
    const {
      navigation: { navigate, getParam }
    } = this.props;

    const user_seq = getParam("user_seq") || 1;
    console.log("TCL: CameraExample -> snap -> user_seq", user_seq);

    if (this.camera) {
      const { base64 } = await this.camera.takePictureAsync({
        base64: true,
        quality: 0.5,
        onPictureSaved: () => {
          alert("onPictureSaved Success!");
        }
      });
      fetch(`${process.env.API_URL}/photo`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          photo_contents: "",
          photo_binary: `data:image/jpeg;base64,${base64}`,
          photo_location: "@Seoul",
          user_seq
        })
      })
        .then(res => res.json())
        .then(resJson => {
          // const { user_seq } = resJson;

          alert("업로드 완료!");
          // navigate("HomeScreen");
          navigate("HomeScreen", { user_seq });
        })
        .catch(error => console.error(error));
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={this.snap}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: "pink" }}>
                  {" "}
                  Snap{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
