useInferredHeight
**default**(): `Object`

Measures a view and then returns its height. Will cause a rerender after the measurement since it's updating the "height" state.
Useful for building more advanced animations and UI components and such.

**`Example`**

```ts
// Height will be set to the height of the view once the view is finished laying out.
const {props, height} = useInferredHeight();

return (<View {...props}><Text>I'm being measured</Text></View>)
```

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `props` | { `onLayout`: `LayoutFunction`  } |
| `props.onLayout` | `LayoutFunction` |

#### Defined in

Layout/useInferredHeight.ts:18