import type { PropsWithChildren } from 'react';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import type { ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useIsFirstRender } from '../../hooks';
import { StyleSheet } from 'react-native';

export type RotatableViewProps = {
  /**
   * Direction to rotate towards. Applies no rotation if direction == baseDirection
   */
  direction: Direction;

  /**
   * Specify how long the rotation animation should last in ms.
   */
  animationDuration?: number;
  /**
   * The initial facing direction of the view. IE a right facing chevron icon should have `baseDirection='right'`.
   */
  baseDirection: Direction;

  /**
   * nativewind class name
   */
  className?: string;
};

/**
 * A utility component for allowing rotating views towards a certain direction more easily. Rotates up to 180 degrees in either direction from the base direction.
 * @example
 * ```tsx
 * <RotatableView
 *  baseDirection='right'
 *  direction="up"
 * >
 *  <MUIIcon
 *    name='chevron-right'
 *  />
 * </RotatableView>
 * ```
 */
export function RotatableView({
  direction,
  baseDirection: _baseDirection,
  animationDuration = 200,
  ...props
}: RotatableViewProps & PropsWithChildren<ViewProps>) {
  // shouldn't change
  const baseDirection = useRef(_baseDirection).current;
  const rotation = useSharedValue(dirsToAngle(baseDirection, direction));
  const isFirstRender = useIsFirstRender();

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }),
    [direction]
  );

  useEffect(() => {
    if (isFirstRender) return;
    rotation.value = withTiming(dirsToAngle(baseDirection, direction), {
      duration: animationDuration,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  return (
    <Animated.View
      {...props}
      style={[animatedStyle, styles.defaultStyles, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  defaultStyles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Direction = 'left' | 'right' | 'up' | 'down';

function angle([cx, cy]: [number, number], [ex, ey]: [number, number]) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

function dirToPoint(dir: Direction): [number, number] {
  switch (dir) {
    case 'down':
      return [0, 1];
    case 'right':
      return [1, 0];
    case 'up':
      return [0, -1];
    case 'left':
      return [-1, 0];
  }
}

function dirsToAngle(dirA: Direction, dirB: Direction) {
  const a = dirToPoint(dirA);
  const b = dirToPoint(dirB);
  return angle([0, 0], b) - angle([0, 0], a);
}
