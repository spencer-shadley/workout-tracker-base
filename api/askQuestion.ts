import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { logError } from '@/utils/logger';
import { addCachedResponse, getCachedResponse } from '@/hooks/useLocalStorage';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY ?? process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const IS_DEBUG = false;

// each request costs money - safety to avoid massive charges from bugs like infinite loops
const MAX_NUMBER_OF_ACTIVE_REQUESTS = 25;
let numberOfActiveRequests = 0;

export async function askQuestion(
  initialProps: Partial<CreateCompletionRequest>
) {
  console.log('askQuestion', initialProps);
  const prompt: string = ((initialProps.prompt as string) ?? '').trim();

  const cachedResponse = getCachedResponse(prompt);
  if (cachedResponse) {
    return Promise.resolve(`cached response: ${cachedResponse}`);
  }

  ++numberOfActiveRequests;
  if (numberOfActiveRequests > MAX_NUMBER_OF_ACTIVE_REQUESTS) {
    logError('too many requests');
    return Promise.reject('too many requests');
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
        resolve(`random: ${Math.random()}`);
        --numberOfActiveRequests;
      }, 2000);
    });
  }

  return new Promise((resolve: (response: string) => void, reject) => {
    openai
      .createCompletion(props)
      .then((response) => {
        let data: string = response.data.choices[0].text ?? '';
        data = data.trim();
        addCachedResponse(prompt, data);
        resolve(data);
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
