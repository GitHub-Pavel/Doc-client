import { UserDto } from 'types';
import { create } from 'zustand';

type UserStore = {
  user: UserDto['user'];
  setUser: (user: UserDto['user']) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
