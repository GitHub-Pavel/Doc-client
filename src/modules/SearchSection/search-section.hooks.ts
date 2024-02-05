import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';

type SearchForm = {
  search: string;
};

export const useSearch = (cacheTag: string) => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<SearchForm>();
  const hasSerachParam = searchParams.has('search');
  const value = searchParams.get('search');
  const onSubmit = handleSubmit((formData) => {
    if (!hasSerachParam) {
      setSearchParams({ ...searchParams, ...formData });
      queryClient.invalidateQueries(cacheTag);
      return;
    }
    searchParams.delete('search');
    setSearchParams(searchParams);

    reset();
    setValue('search', '');
    queryClient.invalidateQueries(cacheTag);
  });
  return { register, onSubmit, hasSerachParam, value, isValid };
};
