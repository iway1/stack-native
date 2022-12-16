type Shared = {
  isLoading: boolean;
  error: unknown;
};
type Mutation = { reset: () => void } & Shared;
type Query = Shared;
// we use duck types to support RQ 3 and 4 at the same time
export type QueryOrMutation = Mutation | Query;

export function isMutation(
  queryOrMutation: QueryOrMutation
): queryOrMutation is Mutation {
  if ('reset' in queryOrMutation) return true;
  return false;
}
