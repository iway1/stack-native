import { styled } from 'nativewind';
import React, { ForwardRefExoticComponent, MutableRefObject } from 'react';
import { Control, useController } from 'react-hook-form';
import type {
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {
  TextFieldControlled,
  TextFieldControlledProps,
} from './TextFieldControlled';

export type TextFieldProps = {
  /**
   * An input that will be focused when the user presses return / done.
   */
  nextInput?: {
    ref: MutableRefObject<TextInput | null>;
    name: string;
  };
  /**
   * a string corresponding to the inputs field name in the schema.
   */
  name: string;
  /**
   * A react-hook-form control.
   */
  control: Control<any>;

  /**
   * Props that get passed to the text input.
   */
  textInputProps?: TextInputProps;

  style?: StyleProp<ViewStyle>;
};

type AllProps = TextFieldProps &
  Omit<TextFieldControlledProps, 'error' | 'textInputProps'>;

/**
 * Primary input component that should be used in forms. Manages it's own state, and built to work with `react-hook-form`.
 * If want a text input such that you can control the state, use TextFieldControlled. Your probably want to style it by passing
 * `defaultInputContainerProps` to the STKContextProvider (normally you'll style the container rather than the ) TextField directly.
 *
 */
export const TextField = styled(function ({
  control,
  name,
  nextInput,
  textInputProps,
  ...props
}: AllProps) {
  const controller = useController({
    name,
    control,
  });
  return (
    <TextFieldControlled
      {...props}
      error={controller.fieldState.error?.message}
      textInputProps={{
        ...textInputProps,
        onChangeText: controller.field.onChange,
        onSubmitEditing: (e) => {
          if (textInputProps?.onSubmitEditing)
            textInputProps.onSubmitEditing(e);
          if (nextInput && !control._fields[nextInput.name]?._f.value) {
            nextInput.ref.current?.focus();
          }
        },
        blurOnSubmit: !nextInput || !!control._fields[nextInput.name]?._f.value,
        value: controller.field.value,
        maxFontSizeMultiplier: 1,
      }}
    />
  );
}) as ForwardRefExoticComponent<AllProps>;
