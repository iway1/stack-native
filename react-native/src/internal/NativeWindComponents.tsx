import { Image, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { styled } from 'nativewind';
import MaskInput from 'react-native-mask-input';

export const AnimatedView = Animated.createAnimatedComponent(View);
export const AnimatedImage = Animated.createAnimatedComponent(Image);
export const AnimatedMaskInput = Animated.createAnimatedComponent(
  styled(MaskInput)
);
