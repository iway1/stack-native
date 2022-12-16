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

Context/DynamicDimensions.ts:9

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

Context/DynamicDimensions.ts:20