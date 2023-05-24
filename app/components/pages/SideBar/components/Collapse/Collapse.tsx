import { useState, useEffect, useRef } from 'react';

interface CollapseProps {
  children: React.ReactNode;
  in: boolean;
  timeout?: number;
  unmountOnExit?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({
  children,
  in: isOpen,
  timeout,
  unmountOnExit,
}) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight || 0);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setHeight(contentRef.current?.scrollHeight || 0);
      }, 0);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const style: React.CSSProperties = {
    height,
    overflow: 'hidden',
    transition: `height ${timeout || 300}ms ease-in-out`,
  };

  return (
    <div style={style}>
      {isOpen || !unmountOnExit ? (
        <div ref={contentRef}>{children}</div>
      ) : null}
    </div>
  );
};
