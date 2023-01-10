useQueryOrMutationError
**useQueryOrMutationError**(`queryOrMutation`): `undefined` \| `NetworkErrorType`

Gets an error message from your query or mutation, based on the getNetworkError
parser passed to STKContextProvider.
Will return undefined if queryOrMutation is undefined (makes it easier to use in situations where
there's an optional prop.), or if there is no error.

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryOrMutation` | `undefined` \| `QueryOrMutation` |

#### Returns

`undefined` \| `NetworkErrorType`

#### Defined in

[Query/useQueryOrMutationError.ts:11](https://github.com/iway1/stack-native/blob/8a81454/react-native/src/hooks/Query/useQueryOrMutationError.ts#L11)