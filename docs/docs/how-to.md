# Documenting Components

Documentation is generated automatically from the component libraries typescript comments using typescript. One documentation file should be generated per file in the component library.

Typedoc will only document exports, so if you want something to appear in the documentation you will need to export it (even if it isn't imported anywhere).

## Documenting Components Example

A well documented component file may look something like this:

````tsx
/**
 * Component One should be used in cases when ComponentTwo is simply too much.
 * @example
 * ```tsx
 * return (
 *  <ComponentOne
 *    propOne={"Hi"}
 *    propTwo={5}
 *  />
 * )
 * ```
 *
 */
export function ComponentOne({
  propOne,
  propTwo,
}: {
  /**
   * Prop one is a string.
   * @example
   * ```ts
   * propOne={"hi!"}
   * ```
   */
  propOne: string;

  /**
   * Prop two is an optional number.
   * @example
   * ```ts
   * propTwo={5}
   * ```
   */
  propTwo?: number;
}) {
  return (
    <View>
      <Text>{`${propOne}: ${propTwo}`}</Text>
    </View>
  );
}
````

We need to create a comment for both the component itself, as well as each prop to the component. These comments will appear in the documentation, but also in the code editor of the developer for extra convenience.

Notice we use `@example` to define some example code in our documentation. This is a great way to provide an example usage of a component. It will be shown in both the documentation file as well as in the developers editor who's using the component.

using the `@` symbol allows us to define special tags in our comments, there are other types of tags as well.

## Library Folder

Anything in the `docs/Library` folder will get deleted during the build step so don't put anything important in there.
