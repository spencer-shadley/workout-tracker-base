import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Main() {
  return (
    <Fab
      color="primary"
      aria-label="add"
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    >
      <AddIcon />
    </Fab>
  );
}
