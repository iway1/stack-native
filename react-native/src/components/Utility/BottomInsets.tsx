import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * A utility component that applies the top bottom area insets. Can be more convenient than wrapping your component in a SafeAreaView
 * @example
 * ```tsx
 * <View>
 *  <BottomInsets/>
 * </View>
 * ```
 */
export function BottomInsets() {
  return <SafeAreaView edges={['bottom']} />;
}
