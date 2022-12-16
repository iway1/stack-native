type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
type RequiredKeys<T> = Exclude<
  KeysOfType<T, Exclude<T[keyof T], undefined>>,
  undefined
>;
type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

export type OptionalPropsOnly<T extends object> = Partial<{
  [key in OptionalKeys<T>]: T[key];
}>;
