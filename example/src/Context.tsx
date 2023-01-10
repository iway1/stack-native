import React from 'react';
import type { ReactNode } from 'react';
import { STKContextProvider } from 'stack-native';
import { ActivityIndicator } from 'react-native';
import { colors } from './colors';

export function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <STKContextProvider
      options={{
        parseNetworkError: (_: unknown) => {
          return { message: "It's an error" };
        },
        defaultInputContainerProps: {
          borderColor: {
            focused: colors.primary,
            unfocused: 'grey',
            error: 'red',
          },
        },
        defaultButtonProps: {
          renderLoadingElement: () => <ActivityIndicator />,
        },
      }}
    >
      {children}
    </STKContextProvider>
  );
}
