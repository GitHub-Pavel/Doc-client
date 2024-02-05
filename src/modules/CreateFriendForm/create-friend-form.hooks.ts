import { arr2Dropdown, postFetch } from 'helpers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { GroupsDto } from 'types';
import { groupsFetch } from './create-friend-form.helpers';
import { CreateFriendFormData } from './create-friend-form.types';

export const useCreateFriendForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);
  const {
    reset,
    setValue,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFriendFormData>();
  const onSubmit = handleSubmit(async (formData) => {
    try {
      setLoading(true);
      const params = { ...formData, groupId: +formData.group };
      await postFetch('/friend/create', params);
      await queryClient.invalidateQueries('friends');
      reset();
      setLoading(false);
      navigate('/friends');
    } catch (err: any) {
      switch (err.type) {
        case 'friend-exists':
          setError('root', {
            message: 'Возвещатель с такими инициалами уже существует',
          });
          break;
        default:
          setError('root', { message: 'Что-то пошло не так' });
      }
      setLoading(false);
    }
  });

  return {
    errors,
    onSubmit,
    setValue,
    register,
    isLoading,
    hasError: Boolean(Object.values(errors).length),
  };
};

export const useGroupValues = () => {
  const { data, isLoading, isError } = useQuery<GroupsDto>(
    'groups',
    groupsFetch,
  );
  const groupValues = isLoading
    ? null
    : isError
    ? null
    : data?.groups
    ? arr2Dropdown(data.groups, 'id', 'group')
    : null;

  return groupValues;
};
