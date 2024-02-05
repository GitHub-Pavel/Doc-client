import { create } from 'zustand';

type FriendsTableStore = {
  error?: string;
  isLoading: boolean;
  setLoading: (is: boolean) => void;
  setError: (message?: string) => void;
};

export const useFriendsTableStore = create<FriendsTableStore>((set) => ({
  isLoading: false,
  setLoading: (is) => set(() => ({ isLoading: is })),
  setError: (error) => set(() => ({ error })),
}));
