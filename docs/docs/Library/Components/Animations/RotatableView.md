RotatableView
**RotatableViewProps**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `animationDuration?` | `number` | Specify how long the rotation animation should last in ms. |
| `baseDirection` | `Direction` | The initial facing direction of the view. IE a right facing chevron icon should have `baseDirection='right'`. |
| `className?` | `string` | nativewind class name |
| `direction` | `Direction` | Direction to rotate towards. Applies no rotation if direction == baseDirection |

#### Defined in

src/components/Animations/RotatableView.tsx:14

## Functions

### RotatableView

▸ **RotatableView**(`«destructured»`): `Element`

A utility component for allowing rotating views towards a certain direction more easily. Rotates up to 180 degrees in either direction from the base direction.

**`Example`**

```tsx
<RotatableView
 baseDirection='right'
 direction="up"
>
 <MUIIcon
   name='chevron-right'
 />
</RotatableView>
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`RotatableViewProps`](Animations_RotatableView.md#rotatableviewprops) & `ViewProps` & { `children?`: `ReactNode`  } |

#### Returns

`Element`

#### Defined in

src/components/Animations/RotatableView.tsx:49