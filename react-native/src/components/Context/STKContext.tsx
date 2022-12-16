import type { InputContainerProps } from 'src/components/Inputs/InputContainer';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { TextInput, TextProps, useWindowDimensions, View } from 'react-native';
import type { OptionalPropsOnly } from 'src/internal/utility-types';

type NetworkErrorType = {
  message: string;
};

/**
 * Options that can be provided by the developer to configure the UI.
 * These shouldn't change during the lifetime of the application (all values should be static).
 * Can be access via useStkOptions()
 */
export type STKContextOptions = {
  /**
   * Default props to pass to the InputContainer component. Can be used to style your input containers globally.
   * Only accepts optional keys.
   */
  defaultInputContainerProps?: OptionalPropsOnly<InputContainerProps>;

  /**
   * InputErrorMessageComponent is the component that is shown to when there is an error message supplied to an InputContainer
   */
  defaultErrorMessageProps?: OptionalPropsOnly<TextProps>;

  /**
   * Default text input props. Good for setting "selectionColor", keyboard type and other things. If you're wanting to style
   * your text input, consider using defaultInputContainerProps instead.
   */
  defaultTextInputProps?: OptionalPropsOnly<TextInput>;

  /**
   * Function to extract an error message from a network error object (should handle any errors thrown in queries.)
   * Required because your app should know how to deal with network errors and create messages from them.
   */
  parseErrorObject: (error: unknown) => NetworkErrorType;
};

type STKContextOptionsValues = STKContextOptions;

/**
 * Values provided by the STKContext that aren't options. Can be accessed via useStkContext()
 */
export type STKContextValues = {
  /**
   * Dimensions.get('window').height can be unreliable on certain android versions. Instead, we calculate the height of the app
   * by measuring a view that takes up the full screen height to ensure the "appHeight" is truly the height our apps view
   * takes up.
   */
  appHeight: number;

  /**
   * Width of the app, no better or worse than using Dimensions.get('window').width or useWindowDimensions().width
   */
  appWidth: number;
};

type Context = {
  values: STKContextValues;
  options: STKContextOptionsValues;
};

const valuesContext = createContext<Context | null>(null);

/**
 * Context Provider for stack-native. Provides both options and internally used values.
 * Can be accessed via useStkContext hook.
 * @param param0
 * @returns
 */
export function STKContextProvider({
  children,
  options,
}: {
  children: ReactNode;
  options: STKContextOptions;
}) {
  const appWidth = useWindowDimensions().width;
  const [appHeight, setAppHeight] = useState<number | null>(null);

  const isLoaded = !!appHeight;

  return (
    <View
      className="flex-1"
      onLayout={(e) => {
        setAppHeight(e.nativeEvent.layout.height);
      }}
    >
      {isLoaded && (
        <valuesContext.Provider
          value={{
            options: {
              ...options,
            },
            values: {
              appHeight,
              appWidth: appWidth,
            },
          }}
        >
          {children}
        </valuesContext.Provider>
      )}
    </View>
  );
}

/**
 * Returns values calculated by the STKContextProvider
 * @returns STKContextValues
 */
export function useStkContext() {
  const ctx = useContext(valuesContext);
  if (ctx === null) {
    throw new Error(
      `useStkContext must be called within a STKContextProvider, did you forget to wrap your app in STKContextProvider?`
    );
  }
  return ctx.values;
}

/**
 * Returns options passed in by the user when rendering the STKContextProvider.
 * Probably not going to be used often other than internally.
 */
export function useStkOptions() {
  const ctx = useContext(valuesContext);
  if (ctx === null) {
    throw new Error(
      `useStkContext must be called within a STKContextProvider, did you forget to wrap your app in STKContextProvider?`
    );
  }
  return ctx.options;
}
