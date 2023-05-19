import { Button, ButtonProps, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

interface TitleButtonProps extends ButtonProps {
  buttonText: string;
}
export function TitleButton({ buttonText, ...buttonProps }: TitleButtonProps) {
  const { data, refetch } = useQuery({
    queryKey:[ `test`],
    queryFn: () =>
      fetch(`/hello`).then((res) => console.log(res))
  })

  return (
    <>
      <Button variant="outlined" {...buttonProps}>
        <Typography variant="h2">
          {buttonText}
        </Typography>
      </Button>
      <Button onClick={() => {
        refetch();
        console.log(data);
      }}>
        test
      </Button>
    </>
  );
}
