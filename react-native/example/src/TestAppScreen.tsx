import React from 'react';
import type { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export function TestAppScreen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {children}
    </SafeAreaView>
  );
}
