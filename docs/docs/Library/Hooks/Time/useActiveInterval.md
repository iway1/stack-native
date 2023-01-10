useActiveInterval
**useActiveInterval**(`f`, `time`): `void`

Runs an interval while the app is active. Please remember to wrap your callback in useCallback or this will behave
unexpectedly. The interval will reset any time this hooks parameter changes or the app becomes active.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | () => `void` | Your callback function to run on the interval. |
| `time` | `number` | How often the interval will fire. |

#### Returns

`void`

#### Defined in

[Time/useActiveInterval.ts:10](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/hooks/Time/useActiveInterval.ts#L10)