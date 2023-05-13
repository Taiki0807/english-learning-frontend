import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useHeader = () => {
  const [anchorEl, setAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const pathname = usePathname();
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };
  const NavItem = (href: string) => {
    // 現在のルートがナビゲーションアイテムのリンクと一致する場合に「active」クラスを付けます
    const isActive = href === pathname;

    return isActive;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener(
      'mousedown',
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, [anchorEl]);

  return {
    handleClick,
    handleClose,
    open,
    anchorEl,
    NavItem,
  };
};

export default useHeader;
