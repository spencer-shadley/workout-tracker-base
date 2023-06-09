import { sample } from 'lodash';

export const searchHints = [
  `Biceps`,
  `Bench press`,
  `Legs`,
  `Core`,
  `High intensity workout`,
  `Easy workout`,
  `Exercises that only require my body`,
  `Cardio workout`,
  `Exercises that only use dumbbells`,
  `Help me to rehabilitate from my hip injury`,
  `Exercises an elderly person with a bad back can do`,
  `Help me get toned biceps`,
  `Exercises I can do with my dog`,
  `Fun exercises`,
  `Get a six pack`,
  `Seated dip machine`,
  `Fly`,
  `Focus on strength`,
  `Outdoor exercises with just my body`,
  `Let's get big and swole!`,
  `Exercises someone with ED syndrome can do`,
];

export const hintFraming = [
  `Search for anything!`,
  `Be specific, generic, or in-between!`,
  `Search exercises, workouts, equipment, conditions, etc.`,
  `Search for something specific to your exact scenario!`,
];

export const advancedHints = [
  `Exclude [X equipment]`,
  `Only show exercises with [X equipment]`,
  `On a 1-10 scale, I want to feel [X intensity]`,
];

export function getRandomHint() {
  const searchHint = sample(searchHints);
  const hintFrame = sample(hintFraming);
  return `${hintFrame} Like "${searchHint}".`;
}
