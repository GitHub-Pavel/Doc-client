import { useFriendsTableStore } from 'modules/FriendsTable/friends-table.store';
import { useRef } from 'react';

type UseCheckboxesResponse = [
  (index?: number) => (el: HTMLInputElement) => void,
  (e: HTMLInputElement) => void,
];

export const useCheckboxes = (): UseCheckboxesResponse => {
  const checkboxRefs = useRef<HTMLInputElement[]>([]);
  const setError = useFriendsTableStore((state) => state.setError);
  const checkboxHandler = (el: HTMLInputElement) => {
    setError();

    if (el.value === 'all') {
      checkboxRefs.current.slice(1).map((input) => {
        if (input) input.checked = el.checked;
      });
      return;
    }
    if (checkboxRefs.current[0].checked && !el.checked) {
      checkboxRefs.current[0].checked = false;
      return;
    }
    if (
      checkboxRefs.current.slice(1).filter((input) => {
        if (!input) return false;
        return !input.checked;
      }).length === 0
    ) {
      checkboxRefs.current[0].checked = true;
      return;
    }
  };
  const addRef = (index = 0) => {
    return (el: HTMLInputElement) => {
      checkboxRefs.current[index] = el;
    };
  };
  return [addRef, checkboxHandler];
};
