DynamicDimensions
**useDynamicHeight**(`y`): `number`

Adjusts a value to be proportional to the height of the screen.
861 is the typical height of one of our screens in figma.

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`number`

y / 861 * actualAppHeight

#### Defined in

[src/components/Context/DynamicDimensions.ts:9](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Context/DynamicDimensions.ts#L9)

___

### useDynamicWidth

▸ **useDynamicWidth**(`x`): `number`

Calculates dynamic width to be proportial to the width of the screen.
390 is the typical height of one our screens in figma.

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`number`

x / 390 * appWidth

#### Defined in

[src/components/Context/DynamicDimensions.ts:20](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/components/Context/DynamicDimensions.ts#L20)