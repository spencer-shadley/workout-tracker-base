export interface StepInfo {
  title: string;
  aiPrompt: string;
}

export const stepInfos: StepInfo[] = [
  {
    title: 'Start workout',
    aiPrompt:
      'Give me exactly one motivational quote to inspire me to workout, get active, exercise, or be fit.',
  },
  {
    title: 'Learn more',
    aiPrompt: 'Tell me why working out is important. Keep it somewhat short.',
  },
  {
    title: 'Settings',
    aiPrompt:
      'Rephrase "change your default settings" into something fun and unique.',
  },
];
