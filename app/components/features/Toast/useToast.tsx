import { useEffect, useState } from 'react';

interface Props {
  outHideDuration: number;
  onClose?: () => void;
}
const useToast = ({ outHideDuration, onClose }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, outHideDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [outHideDuration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return { visible, handleClose };
};

export default useToast;
