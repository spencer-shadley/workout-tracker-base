import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export async function askQuestion(question: string) {
  console.log('asked', question);
  return openai.createCompletion({
    model: 'text-davinci-003',
    prompt: question,
    temperature: 0.2,
    max_tokens: 1500,
  });
}
