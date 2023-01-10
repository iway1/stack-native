import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * A utility component that applies the top safe area insets. Can be more convenient than wrapping your component in a SafeAreaView.
 * @example
 * ```tsx
 * <View>
 *  <TopInsets/>
 * </View>
 * ```
 */
export function TopInsets() {
  return <SafeAreaView edges={['top']} />;
}
