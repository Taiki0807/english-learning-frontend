import { useEffect } from 'react';
import style from './Popover.module.css';

const usePopoverPosition = (
  anchorEl: HTMLElement | null
) => {
  useEffect(() => {
    const updatePopoverPosition = () => {
      if (anchorEl) {
        const { right } = anchorEl.getBoundingClientRect();
        const popover = document.querySelector(
          `.${style.popoverContent}`
        ) as HTMLElement;
        if (popover) {
          popover.style.left = `${right}px`;
        }
      }
    };
    window.addEventListener(
      'resize',
      updatePopoverPosition
    );
    return () => {
      window.removeEventListener(
        'resize',
        updatePopoverPosition
      );
    };
  }, [anchorEl]);

  if (!anchorEl) {
    return null;
  }
};
export default usePopoverPosition;
