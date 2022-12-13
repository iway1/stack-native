import { Text, View } from 'react-native';
import React from 'react';

type ComponentTwoProps = {
  /**
   * Prop one is a string.
   * @example
   * ```ts
   * propOne={"hi!"}
   * ```
   */
  propOne: string;

  /**
   * Prop two is an optional number.
   * @example
   * ```ts
   * propTwo={5}
   * ```
   */
  propTwo?: number;
};

/**
 * Component Two should be used when Component One is not enough. T
 * hat's the only time it should be used, though, some times it is just too much.
 * @param props
 */
export function ComponentTwo(_: ComponentTwoProps) {
  return (
    <View>
      <Text>Great!</Text>
    </View>
  );
}
