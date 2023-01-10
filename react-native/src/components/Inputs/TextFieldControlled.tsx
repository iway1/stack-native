import React, {
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Easing,
  StyleProp,
  StyleSheet,
  TextInput,
  Text,
  TextInputProps,
  TextProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { useStkOptions } from '../Context/STKContext';
import { InputContainer } from './InputContainer';
import { Spacer } from '../Utility/Spacer';
import { useQueryOrMutationError } from '../../hooks/Query/useQueryOrMutationError';
import { useIsFirstRender } from '../../hooks/Utility/useIsFirstRender';
import { AnimatedMaskInput, AnimatedView } from '../../internal/HOC';
import { isMutation, QueryOrMutation } from '../../internal/react-query';
import { reanimatedDefaultAnimations } from '../../internal/reanimated-layout-animations';
import { styled } from 'nativewind/dist/styled';
import type { ForwardRefExoticComponent } from 'react';
// import { reanimatedDefaultAnimations } from '../../internal/reanimated-layout-animations';

type MaskType = 'phone';

type InputType = 'default' | 'phone' | 'digits';

function propsForInputType(inputType: InputType): TextInputProps {
  switch (inputType) {
    case 'digits':
    case 'phone':
      return {
        keyboardType: 'number-pad',
        returnKeyType: 'done',
      };
    default:
      return {};
  }
}

export type TextFieldControlledProps = {
  /**
   * Is multiline?
   */
  multiline?: boolean;
  /**
   * ViewProps for the outermost container component.
   */
  containerProps?: ViewProps;
  /**
   * style for the outermost container component. Gets merged with containerProps style prop if it's passed.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * An element that gets rendered on the right side of the text input. Useful for rendering icons, like "show password" eye.
   */
  rightAdornmentElement?: ReactNode;
  /**
   * An element that gets rendered on the left side of the text input. Useful for rendering an icon in the text field.
   */
  leftAdornmentElement?: ReactNode;
  /**
   * A style that gets applied to the container any time there is a form error or a network error from showErrorsQueryOrMutation.
   */
  containerErrorStyle?: StyleProp<ViewStyle>;
  /**
   * A style that gets applied to the inner input component any time there is a form error or a network error from showErrorsQueryOrMutation.
   */
  inputErrorStyle?: StyleProp<ViewStyle>;
  /**
   * style for the inner input component.
   */
  inputStyle?: StyleProp<ViewStyle>;

  /**
   * Any text input props your want to pass to the inner input.
   */
  textInputProps: TextInputProps;
  /**
   * a label for the text input, used as the placeholder.
   */
  label: string;
  /**
   * styles applied to the text input when it's focused.
   */
  containerFocusedStyle?: StyleProp<ViewStyle>;
  /**
   * A mask to apply to the text input. Currently only supports 'phone'. The mask is shown to the user but isn't reflected in the form state (unmasked value is used.)
   */
  maskType?: MaskType;
  /**
   * An enumeration of input types that set various text input props to implement common text input UX. Inputs are 'default' | 'phone' | 'digits'
   */
  inputType?: InputType;
  /**
   * renders tRPC error messages from any query or mutation. Takes priority over validation error messages (only one will be shown at a time).
   */
  showErrorsQueryOrMutation?: QueryOrMutation;
  /**
   * Ref for the text input. Useful if you need to pass it to nextInputRef.
   */
  textInputRef?: MutableRefObject<TextInput | null>;

  /**
   * Focused border color.
   */
  focusedBorderColor?: string;

  /**
   * Unfocused border color
   */
  unfocusedBorderColor?: string;

  /**
   * Error message, if defined it will render.
   */
  error?: string;

  /**
   * Props to pass to the error message
   */
  errorMessageProps?: TextProps;

  /**
   * Applies additional styles when the input is set to multiline.
   */
  multilineStyles?: StyleProp<ViewStyle>;

  /**
   * Component to render a
   */
  LabelComponent?: ReactNode;

  /**
   * Style to apply to the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * nativewind class name.
   */
  className?: string;
};

/**
 * A controlled text field. Useful for situation where controlled components don't fit your use case.
 */
export const TextFieldControlled = styled(function ({
  containerProps,
  containerStyle,
  rightAdornmentElement,
  leftAdornmentElement,
  inputErrorStyle,
  textInputProps: textInputProps_,
  label,
  showErrorsQueryOrMutation,
  inputType = 'default',
  maskType,
  textInputRef,
  multiline,
  error,
  multilineStyles,
  style,
}: TextFieldControlledProps) {
  const inputRef = useRef<TextInput | null>(null); // prop is used instead if prop is passed.
  const [focused, setFocused] = useState<boolean>(false);
  const stkOptions = useStkOptions();

  const commonInput = [
    styles.defaultInput,
    error ? inputErrorStyle : undefined,
  ];
  const errorAnimation = useSharedValue(0);
  const isFirstRender = useIsFirstRender();

  const inputAnimatedTextColorStyle = useAnimatedStyle(() => ({
    color: interpolateColor(errorAnimation.value, [0, 1], ['black', '#F01565']),
  }));

  const queryOrMutationError = useQueryOrMutationError(
    showErrorsQueryOrMutation
  );

  const showError = (() => {
    if (queryOrMutationError) return queryOrMutationError.message;
    return error;
  })();

  useEffect(() => {
    errorAnimation.value = withTiming(showError ? 1 : 0, {
      duration: 150,
    });
  }, [showError, errorAnimation]);

  const mask = useMaskForMaskType(maskType);

  const _ref = textInputRef ?? inputRef;
  const textInputProps = {
    ...stkOptions.defaultTextInputProps,
    ...textInputProps_,
  };

  return (
    <>
      <InputContainer
        {...containerProps}
        style={[
          containerStyle,
          containerProps?.style,
          multiline ? multilineStyles : undefined,
          style,
        ]}
        onPress={() => {
          _ref.current?.focus();
        }}
        focused={focused}
        leftAdornmentElement={leftAdornmentElement}
        rightAdornmentElement={rightAdornmentElement}
        error={!!showError}
      >
        <AnimatedMaskInput
          autoCapitalize={'none'}
          {...textInputProps}
          {...{
            ...propsForInputType(inputType),
            ...(multiline
              ? {
                  returnKeyType: 'done',
                }
              : {}),
          }}
          ref={_ref}
          style={
            true
              ? {}
              : [
                  commonInput,
                  textInputProps?.style,
                  inputAnimatedTextColorStyle,
                ]
          }
          value={textInputProps.value ? textInputProps.value : ''}
          onChangeText={(_maskedText, unmasked) => {
            textInputProps?.onChangeText &&
              textInputProps?.onChangeText(unmasked);
            if (queryOrMutationError) {
              if (isMutation(showErrorsQueryOrMutation!)) {
                showErrorsQueryOrMutation.reset();
              }
            }
          }}
          multiline={multiline}
          placeholder={
            textInputProps?.placeholder ? textInputProps.placeholder : label
          }
          onFocus={(e) => {
            if (textInputProps?.onFocus) textInputProps.onFocus(e);
            setFocused(true);
          }}
          onBlur={(e) => {
            if (textInputProps?.onBlur) textInputProps.onBlur(e);
            setFocused(false);
          }}
          keyboardAppearance="dark"
          mask={mask}
          // animated when switching between secure entry and non secure entry
          key={'' + textInputProps?.secureTextEntry}
          entering={
            isFirstRender
              ? undefined
              : FadeIn.duration(150).easing(Easing.inOut(Easing.ease))
          }
          exiting={FadeOut.duration(80).easing(Easing.in(Easing.ease))}
          onLayout={(e) => {
            if (textInputProps?.onLayout) textInputProps.onLayout(e);
          }}
        />
      </InputContainer>
      {showError && (
        <AnimatedView
          pointerEvents="none"
          style={styles.errorContainer}
          key={showError} // makes it animate when text changes
          {...reanimatedDefaultAnimations}
        >
          <Spacer y={16} />
          <Text {...stkOptions.defaultErrorMessageProps}>{showError}</Text>
        </AnimatedView>
      )}
    </>
  );
}) as ForwardRefExoticComponent<TextFieldControlledProps>;

function maskForMaskType(type?: MaskType) {
  switch (type) {
    case 'phone':
      return [
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
  }
  return;
}

function useMaskForMaskType(maskType: MaskType | undefined) {
  return useMemo(() => maskForMaskType(maskType), [maskType]);
}

const styles = StyleSheet.create({
  defaultInput: {
    flex: 1,
    height: '100%',
  },
  defaultMultiline: { height: 120, borderRadius: 12 },
  errorContainer: {
    alignItems: 'center',
  },
});
