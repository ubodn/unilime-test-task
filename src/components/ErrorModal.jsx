import { useAppData } from '../hooks/AppProvider';
import { createPortal } from 'react-dom';

export const ErrorModal = () => {
  const { clearErrors, errors } = useAppData();
  const onClick = () => {
    clearErrors(undefined);
  };

  if (typeof errors !== 'string') {
    return null;
  }

  return createPortal(
    <dialog open>
      {errors}
      <form method='dialog' >
        <button onClick={onClick} className="closeModalButton">Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  )
};