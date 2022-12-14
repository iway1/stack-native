import React from 'react';
import { TestAppScreen } from 'example/src/TestAppScreen';
import { ComponentOne } from 'stack-native';

export function ComponentOneScreen() {
  return (
    <TestAppScreen>
      <ComponentOne propOne="One prop" propTwo={5} />
    </TestAppScreen>
  );
}
