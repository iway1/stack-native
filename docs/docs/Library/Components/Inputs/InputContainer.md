InputContainer
**InputContainerAllProps**: [`InputContainerProps`](Inputs_InputContainer.md#inputcontainerprops) & `PressableProps` & { `children`: `ReactNode`  }

#### Defined in

[src/components/Inputs/InputContainer.tsx:78](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Inputs/InputContainer.tsx#L78)

___

### InputContainerComponentType

Ƭ **InputContainerComponentType**: typeof [`InputContainer`](Inputs_InputContainer.md#inputcontainer)

#### Defined in

[src/components/Inputs/InputContainer.tsx:196](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Inputs/InputContainer.tsx#L196)

___

### InputContainerProps

Ƭ **InputContainerProps**: `Object`

Props for the input container

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `borderColor?` | { `error?`: `string` ; `focused`: `string` ; `unfocused`: `string`  } | Border color, supporting both focused, unfocused, and error states. The TextField will automatically animate between the colors. **`Example`** ```tsx <InputContainer borderColor={{focused: 'yellow', unfocused: 'transparent', error: 'red'}} /> ``` |
| `borderColor.error?` | `string` | - |
| `borderColor.focused` | `string` | - |
| `borderColor.unfocused` | `string` | - |
| `error?` | `boolean` | Is there an error? This will set the border color (if passed) and render the error adornment element (if passed). |
| `errorAdornmentElement?` | `ReactNode` | An element to render when there is an error in the text field. |
| `focused?` | `boolean` | Whether or not the input is focused. Controls the borderColor, if passed. |
| `leftAdornmentElement?` | `ReactNode` | An ReactNode that gets placed at the left side of the input container, before any children. Useful for icons and such. **`Example`** ```tsx <InputContainer leftAdornmentElement={<EmailIcon/>} > // ... ``` |
| `rightAdornmentElement?` | `ReactNode` | An ReactNode that gets placed at the right side of the input container, after any children. Useful for icons and such. **`Example`** ```tsx <InputContainer rightAdornmentElement={<EmailIcon/>} > // ... ``` |

#### Defined in

[src/components/Inputs/InputContainer.tsx:24](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Inputs/InputContainer.tsx#L24)

## Functions

### InputContainer

▸ **InputContainer**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

A component that should be used as a base for building text-input like components.
This shouldn't be directly in Screens used too often, usually just passed as the `InputContainer` prop to `TextField` and such.

This exists because often we need to make things that look like text inputs but are actually
not text inputs (like drop downs and such). If we build using this we can maintain just a single component
for all input containers.

**`Example`**

```ts
const code = 'example';
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`InputContainerAllProps`](Inputs_InputContainer.md#inputcontainerallprops) |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

node_modules/@types/react/index.d.ts:351