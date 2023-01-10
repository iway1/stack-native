import { useStkContext } from '../../components/Context/STKContext';

/**
 * Adjusts a value to be proportional to the height of the screen.
 * 861 is the typical height of one of our screens in figma.
 * @param y
 * @returns y / 861 * actualAppHeight
 */
export function useDynamicHeight(y: number) {
  const { appHeight } = useStkContext();
  return (y / 861) * appHeight;
}

/**
 * Calculates dynamic width to be proportial to the width of the screen.
 * 390 is the typical height of one our screens in figma.
 * @param x
 * @returns x / 390 * appWidth
 */
export function useDynamicWidth(x: number) {
  const { appWidth } = useStkContext();
  return (x / 390) * appWidth;
}
