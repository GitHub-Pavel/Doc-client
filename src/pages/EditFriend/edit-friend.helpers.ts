import { getFetch } from 'helpers';

export const fetchFriend = (id: number) => async () =>
  await getFetch('/friend/' + id);
