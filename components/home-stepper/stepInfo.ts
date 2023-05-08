import { Url } from 'next/dist/shared/lib/router/router';

export interface StepInfo {
  title: string;
  aiPrompt: string;
  url: Url;
}

export const stepInfos: StepInfo[] = [
  {
    title: 'Create workout',
    aiPrompt:
      'Give me exactly one motivational quote to inspire me to workout, get active, exercise, or be fit.',
    url: '/CreateWorkoutPage',
  },
  {
    title: 'Learn more',
    aiPrompt: 'Tell me why working out is important. Keep it somewhat short.',
    url: '/',
  },
  {
    title: 'About',
    aiPrompt: 'app info.',
    url: '/',
  },
];
