import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default function CameraExample() {
  const [state, setState] = useState({
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
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
      cameraEl.takePictureAsync({
        base64: true,
        onPictureSaved: () => {
          alert("Success!");
        }
      });
      // .then(({ base64 }) => {
      //   // Post
      //   // base64
      // });
      // Camera.takePictureAsync({ base64: true });
    }
  };

  useEffect(() => {
    permissionRequest();
  }, []);

  const { hasCameraPermission, type } = state;
  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
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
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
            <Button
              style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }}
              title="Take it!"
              onPress={takePicture}
            />
          </View>
        </Camera>
      </View>
    );
  }
}
