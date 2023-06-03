import { Url } from 'next/dist/shared/lib/router/router';

export interface StepInfo {
  title: string;
  aiPrompt: string;
  tutorial?: string;
  url?: Url;
  dialogContent?: string;
}

export const stepInfos: StepInfo[] = [
  {
    title: `Create workout`,
    tutorial:
      `Looks like this is your first time here! Try clicking here to make your first workout - all powered by AI!`,
    aiPrompt:
      `Give me exactly one motivational quote to inspire me to workout, get active, exercise, or be fit.`,
    url: `/CreateWorkoutPage`,
  },
  {
    title: `About`,
    aiPrompt:
      `Provide a description of an app that uses OpenAI to enable custom AI powered workouts unique to each person. Restrict this description to just a few sentences. Prefix the response with "Auto-generated app description from OpenAI".`,
    dialogContent:
      `I created this app to experiment more - to learn more about its feature-set and limitations. I am hoping this can also help solve a missing need in the market - personalized workouts. Every person is different and a successful workout will look very different. I have seen many people become discouraged due to physical limitations (illness, lack of experience, innate conditions, etc.) which prevent them from getting the fitness that would improve their health.`,
  },
  {
    title: `Learn more`,
    aiPrompt: `Tell me why working out is important. Keep it somewhat short.`,
    dialogContent: `TODO: Learn more about fitness in this app!`,
  },

];
