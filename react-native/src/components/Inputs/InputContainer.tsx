import { AnimatedView } from '../../internal/HOC';
import React, { type ReactNode, useEffect } from 'react';
import { StyleSheet, Pressable, PressableProps, View } from 'react-native';
// import MaskInput from 'react-native-mask-input';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  Layout,
  FadeIn,
  Easing,
} from 'react-native-reanimated';
import { logUsageWarning } from '../../internal/log-usage-warning';
import { useStkOptions } from '../Context/STKContext';
import { styled } from 'nativewind';
import type { ForwardRefExoticComponent } from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Props for the input container
 */
export type InputContainerProps = {
  /**
   * Whether or not the input is focused. Controls the borderColor, if passed.
   */
  focused?: boolean;
  /**
   * An ReactNode that gets placed at the left side of the input container, before any children.
   * Useful for icons and such.
   * @example
   * ```tsx
   * <InputContainer
   *  leftAdornmentElement={<EmailIcon/>}
   * >
   *  // ...
   * ```
   */
  leftAdornmentElement?: ReactNode;
  /**
   * An ReactNode that gets placed at the right side of the input container, after any children.
   * Useful for icons and such.
   * @example
   * ```tsx
   * <InputContainer
   *  rightAdornmentElement={<EmailIcon/>}
   * >
   *  // ...
   * ```
   */
  rightAdornmentElement?: ReactNode;
  /**
   * Border color, supporting both focused, unfocused, and error states. The TextField will automatically animate between the colors.
   * @example
   * ```tsx
   * <InputContainer
   *  borderColor={{focused: 'yellow', unfocused: 'transparent', error: 'red'}}
   * />
   * ```
   */
  borderColor?: {
    focused: string;
    unfocused: string;
    error?: string;
  };
  /**
   * An element to render when there is an error in the text field.
   */
  errorAdornmentElement?: ReactNode;
  /**
   * Is there an error?
   * This will set the border color (if passed) and render the error adornment element (if passed).
   */
  error?: boolean;
};

export type InputContainerAllProps = InputContainerProps &
  PressableProps & { children: ReactNode };

/**
 * A component that should be used as a base for building text-input like components.
 * This shouldn't be directly in Screens used too often, usually just passed as the `InputContainer` prop to `TextField` and such.
 *
 * This exists because often we need to make things that look like text inputs but are actually
 * not text inputs (like drop downs and such). If we build using this we can maintain just a single component
 * for all input containers.
 * @example
 * ```ts
 * const code = 'example';
 * ```
 * @param props
 */
export const InputContainer = styled<InputContainerAllProps>(function (
  props: InputContainerAllProps
) {
  const { defaultInputContainerProps } = useStkOptions();
  const {
    onPress,
    focused,
    leftAdornmentElement,
    rightAdornmentElement,
    error,
    errorAdornmentElement,
    borderColor,
    ...rest
  } = {
    ...defaultInputContainerProps,
    ...props,
  };
  const focusedBorderColor = borderColor?.focused ?? 'transparent';
  const unfocusedBorderColor = borderColor?.unfocused ?? 'transparent';
  const focusedAnimation = useSharedValue(0);

  const containerAnimatedFocusedStyle = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        focusedAnimation.value,
        [0, 1],
        [unfocusedBorderColor, focusedBorderColor]
      ),
    }),
    [focusedBorderColor, unfocusedBorderColor]
  );

  useEffect(() => {
    focusedAnimation.value = withTiming(focused ? 1 : 0, {
      duration: 150,
      easing: Easing.in(Easing.ease),
    });
  }, [focused, focusedAnimation]);

  const containerStyles = [
    styles.defaultContainerStyle,
    rest.style,
    containerAnimatedFocusedStyle,
  ];

  if (
    typeof error !== 'undefined' &&
    typeof borderColor?.error === 'undefined' &&
    typeof errorAdornmentElement === 'undefined'
  ) {
    logUsageWarning(
      'InputContainer',
      'error prop was passed, but no error border color or errorAdornmentElement was passed (error does nothing if niether is passed',
      'InputContainer-errorProps'
    );
  }

  return (
    <AnimatedPressable
      {...rest}
      style={[containerStyles]}
      layout={Layout.duration(150)}
      onPress={onPress}
    >
      <>
        {leftAdornmentElement}
        <View style={styles.innerContainerStyle}>{props.children}</View>
        <AnimatedView style={styles.innerViewStyle}>
          {error ? (
            <AnimatedView entering={FadeIn.duration(150)}>
              {errorAdornmentElement}
            </AnimatedView>
          ) : null}

          {rightAdornmentElement}
        </AnimatedView>
      </>
    </AnimatedPressable>
  );
}) as ForwardRefExoticComponent<InputContainerAllProps>;

// These might be overwritten so I think we have to use a stylesheet
const styles = StyleSheet.create({
  defaultContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 1000,
    alignSelf: 'stretch',
  },
  innerContainerStyle: {
    flex: 1,
  },
  innerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export type InputContainerComponentType = typeof InputContainer;
