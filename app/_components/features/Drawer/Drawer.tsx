import style from './Drawer.module.css';

interface Props {
  anchor: 'left' | 'right' | 'top' | 'bottom';
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Drawer = ({
  anchor,
  open,
  children,
  className,
}: Props): JSX.Element => {
  return (
    <>
      <div
        className={`${style[`drawer-${anchor}`]} ${
          open ? style.open : ''
        } ${className}`}
      >
        {children}
      </div>
    </>
  );
};
