useLastDefinedValue
**useLastDefinedValue**<`T`\>(`v`): `undefined` \| `T`

Returns the last value passed to the hook that was not undefined.
Can be useful for situations where you want your conditionally rendered UI to stay
rendered when the data becomes undefined (IE when you navigate away from a screen using react navigation
conditional navigation, depending on data that the first screen needed.).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `v` | `T` | A value |

#### Returns

`undefined` \| `T`

The same value, or the last defined version of it.

#### Defined in

Utility/useLastDefinedValue.ts:11