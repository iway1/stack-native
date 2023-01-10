Spacer
**SpacerProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `x?` | `number` | horizontal spacing distance. Uses defaultSpacing if not provided. |
| `y?` | `number` | Vertical spacing distance. Uses defaultSpacing if not provided. |

#### Defined in

[src/components/Utility/Spacer.tsx:6](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Utility/Spacer.tsx#L6)

## Functions

### Spacer

▸ **Spacer**(`«destructured»`): `Element`

Spacer is a utility component for creating space between components. This spacer will dynamically scale based
on screen width / height. If you want static spacing, use StaticSpacer

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`SpacerProps`](Utility_Spacer.md#spacerprops) |

#### Returns

`Element`

#### Defined in

[src/components/Utility/Spacer.tsx:21](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Utility/Spacer.tsx#L21)

___

### StaticSpacer

▸ **StaticSpacer**(`«destructured»`): `Element`

StaticSpacer is a utility component for creating space between components.
StaticSpacer has a static width / height, if you want a dynamically sized spacer, use
the Spacer component.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`SpacerProps`](Utility_Spacer.md#spacerprops) |

#### Returns

`Element`

#### Defined in

[src/components/Utility/Spacer.tsx:42](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Utility/Spacer.tsx#L42)