import { useMutation } from 'convex/react';
import { use, useState } from 'react';

export const useMutationState = (mutationToRun: any) => {
  const [pending, setPending] = useState(false);

  const mutationFunction = useMutation(mutationToRun);

  const mutate = (payload: any) => {
    setPending(true);
    return mutationFunction(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setPending(false));
  };

  return { mutate, pending };
};
