import { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

export const reanimatedDefaultAnimations = {
  entering: FadeIn.duration(150),
  exiting: FadeOut.duration(150),
  layout: Layout.duration(150),
};
