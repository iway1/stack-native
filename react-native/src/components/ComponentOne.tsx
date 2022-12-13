import React from 'react';
import { View, Text } from 'react-native';

/**
 * Component One should be used in cases when ComponentTwo is simply too much.
 * @example
 * ```tsx
 * return (
 *  <ComponentOne
 *    propOne={"Hi"}
 *    propTwo={5}
 *  />
 * )
 * ```
 *
 */
export function ComponentOne({
  propOne,
  propTwo,
}: {
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
}) {
  return (
    <View>
      <Text>{`${propOne}: ${propTwo}`}</Text>
    </View>
  );
}
