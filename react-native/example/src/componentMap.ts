import { ComponentOneScreen } from 'example/src/components/form/ComponentOne.Screen';
import { ComponentTwoScreen } from 'example/src/components/form/ComponentTwo.Screen';

export type ScreenComponent = () => JSX.Element;

export type ComponentMap = {
  [displayName: string]: ComponentMap | ScreenComponent;
};

// Note this will break when using class based components
export function isComponentMap(
  maybeComponentMap: ComponentMap | ScreenComponent
): maybeComponentMap is ComponentMap {
  return typeof maybeComponentMap !== 'function';
}

/**
 * Structure of the test app is generated via this map.
 */
export const componentMap: ComponentMap = {
  components: {
    form: {
      componentOne: ComponentOneScreen,
      componentTwo: ComponentTwoScreen,
    },
  },
};
