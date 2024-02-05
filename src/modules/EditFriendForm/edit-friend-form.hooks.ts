import { arr2Dropdown, postFetch } from 'helpers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Friend, GroupsDto } from 'types';
import { groupsFetch } from './edit-friend-form.helpers';
import { CreateEditFormData } from './edit-friend-form.types';

export const useEditFriendForm = (defaultValues: Friend) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);
  const {
    setValue,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEditFormData>({
    defaultValues: {
      chars: defaultValues.chars,
      group: String(defaultValues.groupId),
    },
  });
  const onSubmit = handleSubmit(async (formData) => {
    try {
      setLoading(true);
      const params = { ...formData, groupId: +formData.group || null };
      await postFetch('/friend/' + id, params, 'PUT');
      await queryClient.invalidateQueries('friends');
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
