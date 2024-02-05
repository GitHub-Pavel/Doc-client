import { create } from 'zustand';
import { SignUpFormData } from './sign-up-form.types';

type SignUpFormStore = {
  formParams: SignUpFormData | null;
  setParams: (params: SignUpFormData | null) => void;
};

export const useSignUpFormStore = create<SignUpFormStore>((set) => ({
  formParams: null,
  setParams: (formParams) => set(() => ({ formParams })),
}));
