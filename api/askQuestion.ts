import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';

import { logDebug, logError } from '@/utils/logger';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY ?? process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});
delete configuration.baseOptions.headers[`User-Agent`];
const openai = new OpenAIApi(configuration);

// each request costs money - safety to avoid massive charges from bugs like infinite loops
const MAX_NUMBER_OF_ACTIVE_REQUESTS = 50;
let numberOfActiveRequests = 0;

export async function askQuestion(
  initialProps: Partial<CreateCompletionRequest>
) {
  logDebug(`askQuestion`, initialProps);

  initialProps.prompt = (initialProps.prompt as string ?? ``).trim();

  ++numberOfActiveRequests;
  if (numberOfActiveRequests > MAX_NUMBER_OF_ACTIVE_REQUESTS) {
    logError(`too many requests`);
    return Promise.reject(`too many requests`);
  }

  const defaultProps: CreateCompletionRequest = {
    model: `text-davinci-003`,
    prompt: ``,
    temperature: 0.2,
    max_tokens: 1500,
  };

  const props: CreateCompletionRequest = {
    ...defaultProps,
    ...initialProps,
  };

  return new Promise((resolve: (response: string) => void, reject) => {
    openai
      .createCompletion(props)
      .then((response) => {
        let data: string = response.data.choices[0].text ?? ``;
        data = data.trim();
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
