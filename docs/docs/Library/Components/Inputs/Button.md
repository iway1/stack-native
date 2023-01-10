Button
**ButtonProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `backgroundElement?` | `ReactNode` | An element rendered before the other elements, meant to be used for background gradients, etc. |
| `innerViewStyle?` | `StyleProp`<`ViewStyle`\> | A style to apply to the inner view that contains the inner component. |
| `label` | `string` | the buttons text. |
| `loading?` | `boolean` | if true, shows a loading state and disabled the button. |
| `loadingElement?` | `React.ReactNode` | an element to show while loading. If not provided, default will be used. |
| `renderLoadingElement?` | () => `ReactNode` | a function that renders the loading element. |
| `textStyle?` | `StyleProp`<`TextStyle`\> | A style to be applied to the button text element. |
| `touchableStyle?` | `StyleProp`<`ViewStyle`\> | Style to apply to the outer touchable. |

#### Defined in

src/components/Inputs/Button.tsx:21

## Functions

### Button

▸ **Button**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ButtonProps`](Inputs_Button.md#buttonprops) & `Omit`<`TouchableOpacityProps`, ``"children"``\> |

#### Returns

`Element`

#### Defined in

src/components/Inputs/Button.tsx:58