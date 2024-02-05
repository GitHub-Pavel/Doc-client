import { create } from 'zustand';
import { LoginFormData } from './login-form.types';

type LoginFormStore = {
  formParams: LoginFormData | null;
  setParams: (params: LoginFormData | null) => void;
};

export const useLoginFormStore = create<LoginFormStore>((set) => ({
  formParams: null,
  setParams: (formParams) => set(() => ({ formParams })),
}));
