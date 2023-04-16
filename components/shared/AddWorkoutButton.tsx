import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import {
  Accessibility,
  TrendingUp,
  Straighten,
  FitnessCenter,
} from '@mui/icons-material';
import AddHIITWorkoutDialog from '../main/hiit/AddHIITWorkoutDialog';
import React from 'react';

const HIITWorkoutKey = 'Start HIIT Workout';
const actions = [
  {
    icon: <Accessibility />,
    name: HIITWorkoutKey,
  },
  { icon: <FitnessCenter />, name: 'Strength Workout' },
  { icon: <TrendingUp />, name: 'Strength Record' },
  { icon: <Straighten />, name: 'Measurements' },
];

export default function Main() {
  const [currentDialog, setCurrentDialog] = React.useState<string | undefined>(
    undefined
  );

  return (
    <>
      <SpeedDial
        ariaLabel="Add workout"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              setCurrentDialog(action.name);
            }}
          />
        ))}
      </SpeedDial>
      <AddHIITWorkoutDialog
        isOpen={currentDialog === HIITWorkoutKey}
        onClose={() => {
          setCurrentDialog(undefined);
        }}
        title={`${HIITWorkoutKey}`}
      />
      ;
    </>
  );
}
