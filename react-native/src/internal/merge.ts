import type { ViewStyle, TextStyle, StyleProp } from 'react-native';

type StyleType = ViewStyle | TextStyle;
type Props<T extends StyleType> = StyleProp<T>;

export function mergeStyles<
  ST extends StyleType,
  Style extends Props<ST> | undefined
>(a: Style, b: Style) {
  return [a, b] as unknown as StyleProp<ST>;
}

/**
 * Useful for merging props internally
 * @param a defaultProps
 * @param b componentProps
 * @param styleKeys Style keys to merge as styles (keeping styles form each)
 * @returns Merged props
 */
export function mergeDefaultPropsWithProps<T extends Object>(
  a: Partial<T> | undefined,
  b: T | undefined,
  styleKeys: (keyof T)[] = []
) {
  const r = {
    ...a,
    ...b,
  } as T;
  for (const k of styleKeys) {
    const aStyles = a && a[k];
    const bStyles = b && b[k];
    if (aStyles && bStyles) {
      r[k] = mergeStyles(a[k] as any, b[k] as any) as unknown as T[keyof T];
    }
  }
  return r as T;
}
