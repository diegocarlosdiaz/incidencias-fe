import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CommentDialog({ open, onClose }) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // manejar el envio del comentario, por ejemplo, guardandolo en un estado global o enviándolo a una API.
    console.log(comment);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enviar comentario</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Comentario"
          type="text"
          fullWidth
          multiline
          rows={10}
          sx={{ width: '500px'}}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CommentDialog;
