import { useEffect, RefObject } from 'react';

interface Props {
  anchorEl: RefObject<HTMLDivElement> | null;
  onClose: () => void;
}

const usePopover = ({ anchorEl, onClose }: Props) => {
  useEffect(() => {
    if (anchorEl && anchorEl.current) {
      const el = anchorEl.current;
      const handleClickOutside = (e: MouseEvent) => {
        if (!el.contains(e.target as Node)) {
          onClose();
        }
      };
      document.addEventListener(
        'click',
        handleClickOutside
      );
      return () => {
        document.removeEventListener(
          'click',
          handleClickOutside
        );
      };
    }
  }, [anchorEl, onClose]);
};

export default usePopover;
