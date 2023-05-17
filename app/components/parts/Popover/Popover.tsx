import style from './Popover.module.css';
import usePopoverPosition from './usePopoverPosition';

interface Props {
  children: React.ReactNode;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  topValue?: string;
}

export const Popover = (props: Props): JSX.Element => {
  usePopoverPosition(props.anchorEl);

  return (
    <div>
      {props.open && (
        <div
          className={`${style.popoverContent}`}
          style={{
            position: 'absolute',
            left: props.anchorEl?.getBoundingClientRect()
              .right,
            transform: 'translateX(-100%)',
            top: props.topValue,
          }}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
