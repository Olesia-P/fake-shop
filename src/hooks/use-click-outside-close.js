import { useEffect, useRef } from 'react';

export default function useClickOutsideClose(setOpeningState, openingState) {
  const ref = useRef();

  const handleOutsideClick = (event) => {
    if (ref.current && ref.current.contains(event.target)) {
      return;
    }
    setOpeningState(false);
  };

  useEffect(() => {
    if (openingState) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openingState]);

  return ref;
}
