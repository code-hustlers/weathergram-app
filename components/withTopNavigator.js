import React from "react";
import { withNavigation } from "react-navigation";

import { Icon } from "native-base";

const withTopNavigator = WrappedComponent => {
  return class WithTopNavigator extends React.Component {
    static navigationOptions = {
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <Icon
          name="ios-camera"
          style={{ paddingLeft: 16 }}
          onPress={() => this.props.navigation.navigate("CameraScreen")}
          // onPress={() => alert(1)}
        />
      ),
      title: "Weathergram",
      headerRight: <Icon name="ios-send" style={{ paddingRight: 16 }} />
    };

    constructor(props) {
      super(props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withTopNavigator;
