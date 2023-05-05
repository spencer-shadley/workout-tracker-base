export const hints = [
  'Biceps',
  'Bench press',
  'Legs',
  'Core',
  'High intensity workout',
  'Easy workout',
  'Exercises that only require my body',
  'Cardio workout',
  'Exercises that only use dumbbells',
  'Help me to rehabilitate from my hip injury',
  'Exercises an elderly person with a bad back can do',
  'Help me get toned biceps',
  'Exercises I can do with my dog',
  'Fun exercises',
  'Get a six pack',
  'Seated dip machine',
  'Fly',
  'Focus on strength',
  'Outdoor exercises with just my body',
  "Let's get big and swole!",
];

export function getRandomHint() {
  return `Try "${hints[Math.floor(Math.random() * hints.length)]}"`;
}
