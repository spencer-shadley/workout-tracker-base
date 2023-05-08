import { Url } from 'next/dist/shared/lib/router/router';

export interface StepInfo {
  title: string;
  aiPrompt: string;
  url?: Url;
  dialogContent?: string;
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
    dialogContent: 'TODO: Learn more about fitness in this app!',
  },
  {
    title: 'About',
    aiPrompt: 'app info.',
    dialogContent:
      'TODO: Make this have nice formatting and more info. This is an app I created to experiment more with AI to learn more about its feature-set and limitations. I am hoping this can also help solve a missing need in the market - personalized workouts. Every person is different and a successful workout will look very different. I have seen many people become discouraged due to physical limitations (illness, lack of experience, innate conditions, etc.) which prevent them from getting the fitness that would improve their health.',
  },
];
