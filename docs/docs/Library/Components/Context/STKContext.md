STKContext
**STKContextOptions**: `Object`

Options that can be provided by the developer to configure the UI.
These shouldn't change during the lifetime of the application (all values should be static).
Can be access via useStkOptions()

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultErrorMessageProps?` | `OptionalPropsOnly`<`TextProps`\> | InputErrorMessageComponent is the component that is shown to when there is an error message supplied to an InputContainer |
| `defaultInputContainerProps?` | `OptionalPropsOnly`<[`InputContainerProps`](Inputs_InputContainer.md#inputcontainerprops)\> | Default props to pass to the InputContainer component. Can be used to style your input containers globally. Only accepts optional keys. |
| `defaultTextInputProps?` | `OptionalPropsOnly`<`TextInput`\> | Default text input props. Good for setting "selectionColor", keyboard type and other things. If you're wanting to style your text input, consider using defaultInputContainerProps instead. |
| `parseErrorObject` | (`error`: `unknown`) => `NetworkErrorType` | Function to extract an error message from a network error object (should handle any errors thrown in queries.) Required because your app should know how to deal with network errors and create messages from them. |

#### Defined in

Context/STKContext.tsx:15

___

### STKContextValues

Ƭ **STKContextValues**: `Object`

Values provided by the STKContext that aren't options. Can be accessed via useStkContext()

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appHeight` | `number` | Dimensions.get('window').height can be unreliable on certain android versions. Instead, we calculate the height of the app by measuring a view that takes up the full screen height to ensure the "appHeight" is truly the height our apps view takes up. |
| `appWidth` | `number` | Width of the app, no better or worse than using Dimensions.get('window').width or useWindowDimensions().width |

#### Defined in

Context/STKContext.tsx:45

## Functions

### STKContextProvider

▸ **STKContextProvider**(`param0`): `Element`

Context Provider for stack-native. Provides both options and internally used values.
Can be accessed via useStkContext hook.

#### Parameters

| Name | Type |
| :------ | :------ |
| `param0` | `Object` |
| `param0.children` | `ReactNode` |
| `param0.options` | [`STKContextOptions`](Context_STKContext.md#stkcontextoptions) |

#### Returns

`Element`

#### Defined in

Context/STKContext.tsx:72

___

### useStkContext

▸ **useStkContext**(): [`STKContextValues`](Context_STKContext.md#stkcontextvalues)

Returns values calculated by the STKContextProvider

#### Returns

[`STKContextValues`](Context_STKContext.md#stkcontextvalues)

STKContextValues

#### Defined in

Context/STKContext.tsx:114

___

### useStkOptions

▸ **useStkOptions**(): [`STKContextOptions`](Context_STKContext.md#stkcontextoptions)

Returns options passed in by the user when rendering the STKContextProvider.
Probably not going to be used often other than internally.

#### Returns

[`STKContextOptions`](Context_STKContext.md#stkcontextoptions)

#### Defined in

Context/STKContext.tsx:128