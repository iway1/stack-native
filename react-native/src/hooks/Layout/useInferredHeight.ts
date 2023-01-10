import { useMemo, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';

type LayoutFunction = (event: LayoutChangeEvent) => void;

/**
 * Measures a view and then returns its height. Will cause a rerender after the measurement since it's updating the "height" state.
 * Useful for building more advanced animations and UI components and such.
 * @example
 * ```ts
 * // Height will be set to the height of the view once the view is finished laying out.
 * const {props, height} = useInferredHeight();
 *
 * return (<View {...props}><Text>I'm being measured</Text></View>)
 * ```
 * @returns
 */
export function useInferredHeight() {
  const [height, setHeight] = useState<number>(0);

  const onLayout: LayoutFunction = (event) => {
    setHeight(event.nativeEvent.layout.height);
  };

  return useMemo(
    () => ({
      height,
      props: {
        onLayout,
      },
    }),
    [height]
  );
}
