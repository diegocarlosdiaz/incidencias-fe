import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Button';
import CommentIcon from '@mui/icons-material/Comment';


function CommentButton({ onClick }) {
  return (
    <Button variant='outlined' onClick={onClick}><CommentIcon fontSize='small' />
        <Typography pl={0.5}>
        Comentar
        </Typography>
    </Button>
  );
}

export default CommentButton;


