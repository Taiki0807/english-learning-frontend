'use client';
import { useRef } from 'react';
import style from './Popover.module.css';
import usePopover from './usePopover';
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
  const insideRef = useRef<HTMLDivElement>(null);
  usePopover({
    anchorEl: insideRef,
    onClose: props.onClose,
  });

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
          ref={insideRef}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};
