import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Button, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { Linking } from "expo";

export default function CameraScreen() {
  const [state, setState] = useState({
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    uri: null
  });
  // const cameraEl = useRef(null);
  let cameraEl;

  const permissionRequest = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setState({ ...state, hasCameraPermission: status === "granted" });
  };

  const takePicture = async () => {
    if (cameraEl) {
      console.log("cameraEl");
      // cameraEl.takePictureAsync({ base64: true });
      cameraEl
        .takePictureAsync({
          base64: true,
          onPictureSaved: () => {
            alert("Success!");
          }
        })
        .then(({ uri, base64 }) => {
          setState({ ...state, uri });
          // Post
          // Linking.makeUrl("www.naver.com");
          // Linking.makeUrl(base64);
        })
        .catch(error => console.error(error));
    }
  };

  useEffect(() => {
    permissionRequest();
  }, []);

  const { hasCameraPermission, type, uri } = state;
  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        {uri ? (
          <Image source={uri} />
        ) : (
          <Camera
            style={{ flex: 1 }}
            type={type}
            // ref={cameraEl}
            ref={ref => (cameraEl = ref)}
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
                  setState({
                    type:
                      type === Camera.Constants.Type.back
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
              <Button
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                title="Take it!"
                onPress={takePicture}
              />
            </View>
          </Camera>
        )}
      </View>
    );
  }
}
