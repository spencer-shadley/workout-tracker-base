import styled from '@emotion/styled';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { IconButton, StepIconProps } from '@mui/material';

const StepIconRoot = styled(`div`)<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor: `#fff`,
  opacity: 0.25,
  transition: `opacity .5s ease-in-out`,
  zIndex: 1,
  color: `#fff`,
  width: 50,
  height: 50,
  display: `flex`,
  borderRadius: `50%`,
  justifyContent: `center`,
  alignItems: `center`,
  ...ownerState.active && {
    opacity: 0.75,
    boxShadow: `0 4px 10px 0 rgba(0,0,0,.25)`,
  },
  ...ownerState.completed && {
    backgroundColor: `gray`,
  },
}));

export default function StepIcon({
  icon,
  active,
  completed,
  className,
}: StepIconProps) {
  const icons: { [index: string]: React.ReactElement } = {
    1: <FitnessCenterIcon />,
    2: <LightbulbIcon />,
    3: <InfoIcon />,
  };

  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      <IconButton>
        {icons[String(icon)]}
      </IconButton>
    </StepIconRoot>
  );
}
