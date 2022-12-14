import { TestAppScreen } from 'example/src/TestAppScreen';
import React from 'react';
import { ComponentTwo } from 'stack-native';

export function ComponentTwoScreen() {
  return (
    <TestAppScreen>
      <ComponentTwo propOne="Component two hi" />
    </TestAppScreen>
  );
}
