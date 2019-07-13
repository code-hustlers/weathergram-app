import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import styled from "styled-components/native";

const StyledView = styled.View`
  flex: 1;
  background: pink;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StateExample = () => {
  const [state, setState] = useState(1);
  return (
    <StyledView>
      <Text>{state}aksldjfklasjdflkjsadklfjklsa</Text>
      <Button title="alskdjf" onPress={() => setState(state + 1)} />
    </StyledView>
  );
};

export default StateExample;
