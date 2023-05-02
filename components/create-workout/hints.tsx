const hints = [
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
  'Workout out an elderly person with a bad back can do',
  'Help me get toned biceps',
  'Get a six pack',
  'Focus on strength',
  "Let's get big and swole!",
];

export function getRandomHint() {
  return `Try "${hints[Math.floor(Math.random() * hints.length)]}"`;
}
