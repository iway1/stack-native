# Development

When creating new components / hooks / anything else, we often need to manually test them as we're developing. Normally, we're going to be working on some other project when we decide to add new code to the component library, however Metro / React Native don't provide an easy way to work on a package locally and import it into a another local project (for web projects we can just use `yarn link`, however it doesn't work with React Native D: .)

So, we need to make sure our components work in the component library test app first, then push our changes to the component library repo (which will automatically publish to npm, where we can then download the package.) The example app should be setup such that every component (or at least set of related components) has it's own screen where it can be easily tested.

This is so we'll always have a working code example that we can refer to when checking out how components work.

## Initial setup

Install packages in `react-native` directory:

`yarn`

## Example App

The example app is located in `react-native/example` and can be ran with:

`yarn ios`

While in the `react-native/example` directory.

### Example App Project Structure and Guidelines

The example app screens should be named `ComponentName.Screen.tsx`, and they should be organized in a way that corresponds with the structure of the component map. IE:

```js
const componentMap = {
  form: {
    formHeader: FormHeader,
    textField: TextField,
  },
};
```

Should correspond to the folder structure:

src/components/form/FormHeader.Screen.tsx
src/components/form/TextField.Screen.tsx

Organize in a way that feels intuitive, just make sure the screens match component maps structure whatever you decide on.
