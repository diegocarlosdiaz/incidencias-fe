import {useState} from 'react';
import CommentButton from './CommentButton';
import CommentDialog from './CommentDialog';

function CommentModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CommentButton onClick={handleOpen} />
      <CommentDialog open={open} onClose={handleClose} />
    </div>
  );
}

export default CommentModal;
