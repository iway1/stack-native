import { InputContainerScreen } from 'example/src/components/TextField/InputContainer.Screen';
import { TextFieldControlledScreen } from './components/TextField/TextFieldControlled.Screen';
import { TextFieldScreen } from './components/TextField/TextField.Screen';
import { ButtonScreen } from './components/Button.Screen';
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
    input: {
      textField: TextFieldScreen,
      controlledTextField: TextFieldControlledScreen,
      inputContainer: InputContainerScreen,
      button: ButtonScreen,
    },
  },
  hooks: {},
};
