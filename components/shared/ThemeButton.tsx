import { useTheme } from 'next-themes';
import { Button } from '@mui/material';

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="contained"
      onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      Toggle Mode
    </Button>
  );
}
