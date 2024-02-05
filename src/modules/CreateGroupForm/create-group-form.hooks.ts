import { arr2Dropdown, postFetch } from 'helpers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FriendsDto } from 'types';
import { friendsFetch } from './create-group-form.helpers';
import { CreateGroupFormData } from './create-group-form.types';

export const useCreateGroupForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState(false);
  const {
    reset,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupFormData>();
  const onSubmit = handleSubmit(async (formData) => {
    try {
      setLoading(true);
      const params: CreateGroupFormData = {
        number: +formData.number,
        leadId: +formData.leadId! || null,
      };
      await postFetch('/group/create', params);
      await queryClient.invalidateQueries('groups');
      reset();
      setLoading(false);
      navigate('/groups');
    } catch (err: any) {
      switch (err.type) {
        case 'group-exists':
          setError('root', {
            message: 'Такая группа уже существует',
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

export const useFriendValues = () => {
  const { data, isLoading, isError } = useQuery<FriendsDto>(
    'friends_dropdown',
    friendsFetch,
  );
  const dropdownValues = isLoading
    ? null
    : isError
    ? null
    : data?.friends
    ? arr2Dropdown(data.friends, 'id', 'chars')
    : null;

  return dropdownValues;
};
