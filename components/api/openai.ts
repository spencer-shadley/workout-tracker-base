import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export async function askQuestion(question: string) {
  return openai.createCompletion({
    model: 'text-davinci-003',
    prompt: question,
    temperature: 0.2,
    max_tokens: 1500,
  });
}
