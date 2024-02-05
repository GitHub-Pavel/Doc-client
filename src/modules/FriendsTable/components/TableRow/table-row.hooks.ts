import { postFetch } from 'helpers';
import { MouseEvent, useState } from 'react';
import { useQueryClient } from 'react-query';

export const useRemoveFriend = (
  id: number,
): [(e: MouseEvent<HTMLElement>) => Promise<void>, boolean] => {
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);
  const removeHandler = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postFetch('/friend/delete', { ids: [id] }, 'DELETE', true);
      await queryClient.invalidateQueries('friends');
    } catch (err) {
      console.warn(err);
      setLoading(true);
    }
  };
  return [removeHandler, isLoading];
};
