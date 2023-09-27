import { useEffect } from 'react';

export default function useClickOutsideClose(
  ref,
  setOpeningState,
  openingState,
) {
  const handleOutsideClick = (event) => {
    if (ref.current.contains(event.target)) {
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
}
