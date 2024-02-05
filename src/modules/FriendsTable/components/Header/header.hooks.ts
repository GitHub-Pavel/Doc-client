import { postFetch } from 'helpers';
import { useFriendsTableStore } from 'modules/FriendsTable/friends-table.store';
import { MutableRefObject } from 'react';
import { useQueryClient } from 'react-query';

export const useRemoveFriends = (
  formRef: MutableRefObject<HTMLFormElement | null>,
) => {
  const queryClient = useQueryClient();
  const setLoading = useFriendsTableStore((state) => state.setLoading);
  const setError = useFriendsTableStore((state) => state.setError);
  const removeHandler = async () => {
    if (!formRef.current) return null;
    setLoading(true);
    const formData = new FormData(formRef.current);
    const ids = formData
      .getAll('friendsList')
      .map((str) => str !== 'all' && Number(str))
      .filter((id) => id);

    if (!ids.length) {
      setError('Возвещатели не выбраны');
      setLoading(false);
      return;
    }

    setError();
    await postFetch('/friend/delete', { ids }, 'DELETE', true);
    await queryClient.invalidateQueries('friends');
    formRef.current?.reset();
    setLoading(false);
  };
  return removeHandler;
};
