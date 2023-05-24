import { ReactNode } from 'react';

interface ListItemButtonProps {
  className?: string;
  onClick: () => void;
  children: ReactNode;
}

export const ListItemButton = ({
  className,
  onClick,
  children,
}: ListItemButtonProps): JSX.Element => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default ListItemButton;
