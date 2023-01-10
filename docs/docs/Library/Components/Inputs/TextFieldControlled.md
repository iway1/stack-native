TextFieldControlled
**TextFieldControlledProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `LabelComponent?` | `ReactNode` | Component to render a |
| `className?` | `string` | nativewind class name. |
| `containerErrorStyle?` | `StyleProp`<`ViewStyle`\> | A style that gets applied to the container any time there is a form error or a network error from showErrorsQueryOrMutation. |
| `containerFocusedStyle?` | `StyleProp`<`ViewStyle`\> | styles applied to the text input when it's focused. |
| `containerProps?` | `ViewProps` | ViewProps for the outermost container component. |
| `containerStyle?` | `StyleProp`<`ViewStyle`\> | style for the outermost container component. Gets merged with containerProps style prop if it's passed. |
| `error?` | `string` | Error message, if defined it will render. |
| `errorMessageProps?` | `TextProps` | Props to pass to the error message |
| `focusedBorderColor?` | `string` | Focused border color. |
| `inputErrorStyle?` | `StyleProp`<`ViewStyle`\> | A style that gets applied to the inner input component any time there is a form error or a network error from showErrorsQueryOrMutation. |
| `inputStyle?` | `StyleProp`<`ViewStyle`\> | style for the inner input component. |
| `inputType?` | `InputType` | An enumeration of input types that set various text input props to implement common text input UX. Inputs are 'default' \| 'phone' \| 'digits' |
| `label` | `string` | a label for the text input, used as the placeholder. |
| `leftAdornmentElement?` | `ReactNode` | An element that gets rendered on the left side of the text input. Useful for rendering an icon in the text field. |
| `maskType?` | `MaskType` | A mask to apply to the text input. Currently only supports 'phone'. The mask is shown to the user but isn't reflected in the form state (unmasked value is used.) |
| `multiline?` | `boolean` | Is multiline? |
| `multilineStyles?` | `StyleProp`<`ViewStyle`\> | Applies additional styles when the input is set to multiline. |
| `rightAdornmentElement?` | `ReactNode` | An element that gets rendered on the right side of the text input. Useful for rendering icons, like "show password" eye. |
| `showErrorsQueryOrMutation?` | `QueryOrMutation` | renders tRPC error messages from any query or mutation. Takes priority over validation error messages (only one will be shown at a time). |
| `style?` | `StyleProp`<`ViewStyle`\> | Style to apply to the container |
| `textInputProps` | `TextInputProps` | Any text input props your want to pass to the inner input. |
| `textInputRef?` | `MutableRefObject`<`TextInput` \| ``null``\> | Ref for the text input. Useful if you need to pass it to nextInputRef. |
| `unfocusedBorderColor?` | `string` | Unfocused border color |

#### Defined in

[src/components/Inputs/TextFieldControlled.tsx:57](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Inputs/TextFieldControlled.tsx#L57)

## Functions

### TextFieldControlled

▸ **TextFieldControlled**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

A controlled text field. Useful for situation where controlled components don't fit your use case.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TextFieldControlledProps`](Inputs_TextFieldControlled.md#textfieldcontrolledprops) |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

node_modules/@types/react/index.d.ts:351