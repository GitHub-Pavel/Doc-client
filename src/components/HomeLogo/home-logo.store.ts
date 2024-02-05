import { create } from 'zustand';

type HomoLogoStore = {
  isHide: boolean;
  isAnimationEnd: boolean;
  toggleShow: () => void;
  setAnimationEnd: () => void;
};

export const useHomeLogoStore = create<HomoLogoStore>((set) => ({
  isHide: false,
  isAnimationEnd: true,
  toggleShow: () =>
    set((state) => ({ isHide: !state.isHide, isAnimationEnd: true })),
  setAnimationEnd: () => set(() => ({ isAnimationEnd: false })),
}));
