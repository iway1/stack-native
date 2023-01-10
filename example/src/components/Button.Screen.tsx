import React, { useState } from "react";
import { STKButton } from "stack-native";
import { TestAppScreen } from "../TestAppScreen";

export function ButtonScreen() {
  const [loading, setLoading] = useState<boolean>(false);

  function onPress() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <TestAppScreen>
      <STKButton
        className="mt-16"
        loading={loading}
        label="Is a button"
        onPress={onPress}
      />
    </TestAppScreen>
  );
}
