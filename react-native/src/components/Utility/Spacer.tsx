import React, { useMemo } from 'react';
import { View } from 'react-native';
import {
  useDynamicHeight,
  useDynamicWidth,
} from 'src/components/Context/DynamicDimensions';

export type SpacerProps = {
  /**
   * horizontal spacing distance. Uses defaultSpacing if not provided.
   */
  x?: number;
  /**
   * Vertical spacing distance. Uses defaultSpacing if not provided.
   */
  y?: number;
};

/**
 * Spacer is a utility component for creating space between components. This spacer will dynamically scale based
 * on screen width / height. If you want static spacing, use StaticSpacer
 */
export function Spacer({ x, y }: SpacerProps) {
  const dynamicX = useDynamicWidth(x ? x : 0);
  const dynamicY = useDynamicHeight(y ? y : 0);
  return (
    <View
      style={useMemo(
        () => ({
          ...(typeof x !== 'undefined' && { width: dynamicX }),
          ...(typeof y !== 'undefined' && { height: dynamicY }),
        }),
        [dynamicX, dynamicY, x, y]
      )}
    />
  );
}

/**
 * StaticSpacer is a utility component for creating space between components.
 * StaticSpacer has a static width / height, if you want a dynamically sized spacer, use
 * the Spacer component.
 */
export function StaticSpacer({ x, y }: SpacerProps) {
  return (
    <View
      style={useMemo(
        () => ({
          ...(typeof x !== 'undefined' && { width: x }),
          ...(typeof y !== 'undefined' && { height: y }),
        }),
        [x, y]
      )}
    />
  );
}
