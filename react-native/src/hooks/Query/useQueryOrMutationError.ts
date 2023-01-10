import { useStkOptions } from '../../components';
import type { QueryOrMutation } from 'src/internal/react-query';

/**
 * Gets an error message from your query or mutation, based on the getNetworkError
 * parser passed to STKContextProvider.
 * Will return undefined if queryOrMutation is undefined (makes it easier to use in situations where
 * there's an optional prop.), or if there is no error.
 * @param queryOrMutation
 * @example
 * ```tsx
 * const myQuery = useQuery(['key'],fetchMyData);
 *
 * const {message} = useQueryOrMutationError(myQuery);
 *
 * return (
 *  <View>
 *    {message && <Text>{`Error: ${message}`}</Text>}
 *  </View>
 * )
 * ```
 */
export function useQueryOrMutationError(
  queryOrMutation: QueryOrMutation | undefined
) {
  const { parseNetworkError: parseErrorObject } = useStkOptions();
  if (!queryOrMutation?.error) return;
  return parseErrorObject(queryOrMutation.error);
}
