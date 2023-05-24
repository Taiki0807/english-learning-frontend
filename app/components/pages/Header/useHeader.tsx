import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthContext } from '@/app/components/features/LoginForm/AuthContext';
import { getFetcher } from '@/utils/httpClient';

const useHeader = () => {
  const [anchorEl, setAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthContext();
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
  const handleLogout = async () => {
    await getFetcher('/api/v1/logout/');
    setUser && setUser(undefined);
    router.push('/signup');
  };

  return {
    handleClick,
    handleClose,
    open,
    anchorEl,
    NavItem,
    handleLogout,
  };
};

export default useHeader;
