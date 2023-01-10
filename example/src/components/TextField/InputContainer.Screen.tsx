import React from "react";
import { TestAppScreen } from "example/src/TestAppScreen";
import { Text } from "react-native";
import { InputContainer } from "stack-native";
import { MUIIcon } from "../../ContainerScreen";

export function InputContainerScreen() {
  return (
    <TestAppScreen>
      <InputContainer
        className="mt-16"
        rightAdornmentElement={<MUIIcon size={24} name="wysiwyg" />}
      >
        <Text>A Text component inside the container</Text>
      </InputContainer>
    </TestAppScreen>
  );
}
