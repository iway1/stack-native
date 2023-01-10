import { styled } from 'nativewind';
import React, { ForwardRefExoticComponent, ReactNode } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { reanimatedDefaultAnimations } from '../../internal/reanimated-layout-animations';
import { useStkOptions } from '../Context/STKContext';

const defaultTouchableStyle: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
};

export type ButtonProps = {
  /**
   * if true, shows a loading state and disabled the button.
   */
  loading?: boolean;
  /**
   * an element to show while loading. If not provided, default will be used.
   */
  loadingElement?: React.ReactNode;
  /**
   * the buttons text.
   */
  label: string;
  /**
   * a function that renders the loading element.
   */
  renderLoadingElement?: () => ReactNode;
  /**
   * Style to apply to the outer touchable.
   */
  touchableStyle?: StyleProp<ViewStyle>;
  /**
   * A style to apply to the inner view that contains the inner component.
   */
  innerViewStyle?: StyleProp<ViewStyle>;

  /**
   * An element rendered before the other elements, meant to be used for background gradients, etc.
   */
  backgroundElement?: ReactNode;

  /**
   * A style to be applied to the button text element.
   */
  textStyle?: StyleProp<TextStyle>;
};
type Props = ButtonProps & Omit<TouchableOpacityProps, 'children'>;
export const Button = styled(function (props: Props) {
  const defaultProps = useStkOptions().defaultButtonProps;
  const {
    loading,
    renderLoadingElement,
    label,
    touchableStyle,
    innerViewStyle,
    textStyle,
    backgroundElement,
    style,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };

  if (loading && !renderLoadingElement) {
    console.warn(
      "STKButton - loading prop is 'true' but no 'renderLoadingElement' prop was passed. Either pass it directly to STKButton or set it in defaultButtonProps"
    );
  }

  return (
    <TouchableOpacity
      disabled={loading}
      {...rest}
      activeOpacity={rest.activeOpacity ? rest.activeOpacity : 0.92}
      style={[defaultTouchableStyle, touchableStyle, style]}
    >
      {backgroundElement}
      <View style={[styles.defaultInnerViewStyles, innerViewStyle]}>
        <Animated.Text
          style={[styles.defaultTextStyle, textStyle]}
          key={loading ? ' ' : label}
          numberOfLines={1}
          adjustsFontSizeToFit
          {...reanimatedDefaultAnimations}
        >
          {loading ? ' ' : label}
        </Animated.Text>
      </View>
      {loading && renderLoadingElement && (
        <View style={styles.loadingElementContainer}>
          {renderLoadingElement()}
        </View>
      )}
    </TouchableOpacity>
  );
}) as ForwardRefExoticComponent<Props>;

const styles = StyleSheet.create({
  defaultInnerViewStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    width: '100%',
  },
  defaultTextStyle: {
    alignSelf: 'center',
    marginHorizontal: 12,
  },
  loadingElementContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
