import React from 'react';
import type { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

export function TestAppScreen({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
  className?: string;
}) {
  return (
    <View style={style} className="flex-1 justify-start items-center p-2">
      {children}
    </View>
  );
}
