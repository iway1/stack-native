import React from 'react';
import { TestAppScreen } from 'example/src/TestAppScreen';
import { useState } from 'react';
import { TextFieldControlled } from 'stack-native';
import { MUIIcon } from '../../ContainerScreen';
export function TextFieldControlledScreen() {
  const [value, setValue] = useState('');
  return (
    <TestAppScreen>
      <TextFieldControlled
        label={'A Text Field'}
        className={'mt-16'}
        textInputProps={{
          value,
          onChangeText: setValue,
        }}
        rightAdornmentElement={<MUIIcon name="smart-button" />}
      />
    </TestAppScreen>
  );
}
