import { postFetch } from 'helpers';

export const friendsFetch = (paged = 0) => {
  let search: string | null = null;
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('search')) {
    search = searchParams.get('search');
  }
  return async () => await postFetch('/friend/page', { search, paged });
};
