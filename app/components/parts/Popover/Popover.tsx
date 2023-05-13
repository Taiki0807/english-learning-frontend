import style from './Popover.module.css';
import usePopoverPosition from './usePopoverPosition';

interface Props {
  children: React.ReactNode;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const Popover = (props: Props): JSX.Element => {
  usePopoverPosition(props.anchorEl);

  return (
    <div>
      {props.open && (
        <div
          className={style.popoverContent}
          style={{
            position: 'absolute',
            left: props.anchorEl?.getBoundingClientRect()
              .right,
            transform: 'translateX(-100%)',
          }}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
