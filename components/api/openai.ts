import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export interface askQuestionProps {
  question: string;
  temperature?: number;
}

export async function askQuestion({ question, temperature }: askQuestionProps) {
  console.log('asked', question);
  return openai.createCompletion({
    model: 'text-davinci-003',
    prompt: question,
    temperature: temperature ?? 0.2,
    max_tokens: 1500,
  });
}
