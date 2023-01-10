TextField
**TextFieldProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `control` | `Control`<`any`\> | A react-hook-form control. |
| `name` | `string` | a string corresponding to the inputs field name in the schema. |
| `nextInput?` | { `name`: `string` ; `ref`: `MutableRefObject`<`TextInput` \| ``null``\>  } | An input that will be focused when the user presses return / done. |
| `nextInput.name` | `string` | - |
| `nextInput.ref` | `MutableRefObject`<`TextInput` \| ``null``\> | - |
| `style?` | `StyleProp`<`ViewStyle`\> | - |
| `textInputProps?` | `TextInputProps` | Props that get passed to the text input. |

#### Defined in

[src/components/Inputs/TextField.tsx:14](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Inputs/TextField.tsx#L14)

## Functions

### TextField

▸ **TextField**(`«destructured»`): `Element`

Primary input component that should be used in forms. Manages it's own state, and built to work with `react-hook-form`.
If want a text input such that you can control the state, use TextFieldControlled. Your probably want to style it by passing
`defaultInputContainerProps` to the STKContextProvider (normally you'll style the container rather than the ) TextField directly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `AllProps` |

#### Returns

`Element`

#### Defined in

[src/components/Inputs/TextField.tsx:48](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Inputs/TextField.tsx#L48)