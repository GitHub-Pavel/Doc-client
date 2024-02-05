import { postFetch } from 'helpers';
import { appEmitter } from 'main';
import { MutableRefObject, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useGroupsListStore } from './groups-list.store';

export const useRemoveGroups = (
  formRef: MutableRefObject<HTMLFormElement | null>,
  checkboxRef: MutableRefObject<HTMLInputElement | null>,
) => {
  const queryClient = useQueryClient();
  const setLoading = useGroupsListStore((state) => state.setLoading);
  const setError = useGroupsListStore((state) => state.setError);
  const removeHandler = async () => {
    if (!formRef.current) return null;
    setLoading(true);
    const formData = new FormData(formRef.current);
    const ids = formData
      .getAll('groupList')
      .map((str) => str !== 'all' && Number(str))
      .filter((id) => id);

    if (!ids.length) {
      setError('Группы не выбраны');
      setLoading(false);
      return;
    }

    setError();
    await postFetch('/group/delete', { ids }, 'DELETE', true);
    await queryClient.invalidateQueries('groups');
    formRef.current?.reset();
    setLoading(false);

    if (checkboxRef.current) {
      appEmitter.emit('checkbox/change', checkboxRef.current, false);
    }
  };
  return removeHandler;
};

export const useGroupDelete = (id: number): [() => void, boolean] => {
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handler = async () => {
    setLoading(true);
    await postFetch('/group/delete', { ids: [id] }, 'DELETE', true);
    queryClient.invalidateQueries('groups');
  };
  return [handler, isLoading];
};
