import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { logError } from '@/utils/error';

const configuration = new Configuration({
  apiKey:
    process.env.OPEN_AI_KEY ??
    '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',
});
const openai = new OpenAIApi(configuration);

const tooManyRequests = new Promise(
  (resolve: (response: string) => void, reject) => {
    reject('too many requests');
  }
);

const IS_DEBUG = false;

// each request costs money - safety to avoid massive charges from bugs like infinite loops
const MAX_NUMBER_OF_ACTIVE_REQUESTS = 25;
let numberOfActiveRequests = 0;

export async function askQuestion(
  initialProps: Partial<CreateCompletionRequest>
) {
  console.log('askQuestion', initialProps);
  ++numberOfActiveRequests;
  if (numberOfActiveRequests > MAX_NUMBER_OF_ACTIVE_REQUESTS) {
    logError('too many requests');
    return tooManyRequests;
  }

  const defaultProps: CreateCompletionRequest = {
    model: 'text-davinci-003',
    prompt: '',
    temperature: 0.2,
    max_tokens: 1500,
  };

  const props: CreateCompletionRequest = {
    ...defaultProps,
    ...initialProps,
  };

  if (IS_DEBUG) {
    return new Promise((resolve: (response: string) => void) => {
      setTimeout(() => {
        resolve('random: ' + Math.random());
        --numberOfActiveRequests;
      }, 2000);
    });
  }

  return new Promise((resolve: (response: string) => void, reject) => {
    openai
      .createCompletion(props)
      .then((response) => {
        resolve(response.data.choices[0].text ?? '');
      })
      .catch((error) => {
        reject(error);
        logError(error);
      })
      .finally(() => {
        --numberOfActiveRequests;
      });
  });
}
