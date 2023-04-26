import { Configuration, OpenAIApi } from 'openai';
import throttle from 'lodash/throttle';
import { logError } from '@/utils/error';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export interface askQuestionProps {
  question: string;
  temperature?: number;
}

export async function askQuestion({ question, temperature }: askQuestionProps) {
  console.log('askQuestion', question, temperature);
  return new Promise((resolve: (response: string) => void, reject) => {
    // throttle(() => {
    openai
      .createCompletion({
        model: 'text-davinci-003',
        prompt: question,
        temperature: temperature ?? 0.2,
        max_tokens: 1500,
      })
      .then((response) => {
        resolve(response.data.choices[0].text ?? '');
      })
      .catch((error) => {
        reject(error);
        logError(error);
      });
    // }, 2000);
  });
}
