import MaskInput from 'react-native-mask-input';
import { Image, View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { styled } from 'nativewind';

export const AnimatedView = Animated.createAnimatedComponent(View);
export const AnimatedImage = Animated.createAnimatedComponent(Image);
export const AnimatedMaskInput = Animated.createAnimatedComponent(MaskInput);

export const NWView = styled(View);
export const NWTouchableOpacity = styled(TouchableOpacity);
