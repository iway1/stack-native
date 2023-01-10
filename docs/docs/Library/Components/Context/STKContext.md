STKContext
**STKContextOptions**: `Object`

Options that can be provided by the developer to configure the UI.
These shouldn't change during the lifetime of the application (all values should be static).
Can be access via useStkOptions()

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `defaultButtonProps?` | `OptionalPropsOnly`<[`ButtonProps`](Inputs_Button.md#buttonprops)\> | Default props to pass to `<STKButton/>` components. |
| `defaultErrorMessageProps?` | `OptionalPropsOnly`<`TextProps`\> | InputErrorMessageComponent is the component that is shown to when there is an error message supplied to an InputContainer |
| `defaultInputContainerProps?` | `OptionalPropsOnly`<[`InputContainerProps`](Inputs_InputContainer.md#inputcontainerprops) & `ViewProps`\> | Default props to pass to the InputContainer component. Can be used to style your input containers globally (TextInput, DropDown). |
| `defaultTextInputProps?` | `OptionalPropsOnly`<`TextInput`\> | Default text input props. Good for setting "selectionColor", keyboard type and other things. If you're wanting to style your text input contaienr (which is usually where most of the styles go), consider using defaultInputContainerProps instead. |
| `parseNetworkError` | (`error`: `unknown`) => `NetworkErrorType` | Function to extract an error message from a network error object (should handle any errors thrown in queries.) Required because your app should know how to deal with network errors and create messages from them. Whatever is returned from this function will be used to display network errors via the error utilities like (useQueryOrMutationError). |

#### Defined in

[src/components/Context/STKContext.tsx:23](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Context/STKContext.tsx#L23)

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

[src/components/Context/STKContext.tsx:61](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Context/STKContext.tsx#L61)

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

[src/components/Context/STKContext.tsx:88](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Context/STKContext.tsx#L88)

___

### useStkContext

▸ **useStkContext**(): [`STKContextValues`](Context_STKContext.md#stkcontextvalues)

Returns values calculated by the STKContextProvider

#### Returns

[`STKContextValues`](Context_STKContext.md#stkcontextvalues)

STKContextValues

#### Defined in

[src/components/Context/STKContext.tsx:134](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Context/STKContext.tsx#L134)

___

### useStkOptions

▸ **useStkOptions**(): [`STKContextOptions`](Context_STKContext.md#stkcontextoptions)

Returns options passed in by the user when rendering the STKContextProvider.
Probably not going to be used often other than internally.

#### Returns

[`STKContextOptions`](Context_STKContext.md#stkcontextoptions)

#### Defined in

[src/components/Context/STKContext.tsx:148](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Context/STKContext.tsx#L148)