import {useState} from 'react';
import { NewIncidenceModal } from './NewIncidenceModal';
import IncidenceButton from './IncidenceButton';

export const NewIncidence = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IncidenceButton onClick={handleOpen} />
      <NewIncidenceModal open={open} handleClose={handleClose} />
    </div>
  );
}
