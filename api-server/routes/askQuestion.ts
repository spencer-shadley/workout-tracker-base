/* eslint-disable indent */
import {
    Configuration, CreateChatCompletionRequest, CreateCompletionRequest, OpenAIApi
} from 'openai';

/* eslint-enable indent */
import { redisClient } from '../redisClient';

// each request costs money - safety to avoid massive charges from bugs like infinite loops
const MAX_NUMBER_OF_ACTIVE_REQUESTS = 150;
let numberOfActiveRequests = 0;
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export async function askQuestion(
  prompt: string,
  skipCache = false,
  initialProps: Partial<CreateCompletionRequest> = {}
): Promise<string> {
  console.log(`askQuestion`, prompt);

  const redisCacheKey = `prompt/${prompt}`;
  const redisCacheValue = await redisClient?.get(redisCacheKey);

  if (redisCacheValue && !skipCache) {
    console.log(`found prompt in cache`, prompt);
    return Promise.resolve(redisCacheValue);
  } else {
    console.log(`prompt not found in cache`, prompt);
  }

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

  const defaultProps: CreateChatCompletionRequest = {
    model: `gpt-3.5-turbo`,
    messages: [{ content: prompt, role: `user` }],
    temperature: 0.2,
    max_tokens: 1500,
  };

  return new Promise((resolve: (response: string) => void, reject) => {
    openai
      .createChatCompletion(defaultProps)
      .then((response) => {
        let data: string = response.data.choices[0].message?.content ?? ``;
        data = data.trim();
        redisClient?.set(redisCacheKey, data, {
          EX: ONE_WEEK_IN_SECONDS,
        });
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
