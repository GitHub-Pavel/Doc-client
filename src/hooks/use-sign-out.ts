import { getFetch } from 'helpers';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store';

export const useSignOut = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const signOut = async () => {
    try {
      await getFetch('/auth/sign-out', true);
      setUser(null);
      navigate('/');
    } catch (err) {
      console.warn(err);
    }
  };
  return signOut;
};
