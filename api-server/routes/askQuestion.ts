import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';

// each request costs money - safety to avoid massive charges from bugs like infinite loops
const MAX_NUMBER_OF_ACTIVE_REQUESTS = 50;
let numberOfActiveRequests = 0;

export async function askQuestion(
  prompt: string,
  initialProps: Partial<CreateCompletionRequest> = {}
) {
  console.log(`askQuestion`, prompt);

  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  initialProps.prompt = prompt.trim();

  ++numberOfActiveRequests;
  if (numberOfActiveRequests > MAX_NUMBER_OF_ACTIVE_REQUESTS) {
    console.error(`too many requests`);
    return Promise.reject(`too many requests`);
  }

  const defaultProps: Partial<CreateCompletionRequest> = {
    model: `text-davinci-003`,
    temperature: 0.2,
    max_tokens: 1500,
  };

  const props: CreateCompletionRequest = {
    ...defaultProps,
    ...initialProps,
  } as CreateCompletionRequest;

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
        console.error(error);
      })
      .finally(() => {
        --numberOfActiveRequests;
      });
  });
}
