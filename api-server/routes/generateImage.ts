import { Configuration, CreateCompletionRequest, CreateImageRequest, OpenAIApi } from 'openai';

import { redisClient } from '../redisClient';

// each request costs money - safety to avoid massive charges from bugs like infinite loops
const MAX_NUMBER_OF_ACTIVE_REQUESTS = 50;
let numberOfActiveRequests = 0;
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export async function generateImage(
  prompt: string,
  initialProps: Partial<CreateCompletionRequest> = {}
): Promise<string> {
  console.log(`generate image`, prompt);

  const redisCacheKey = `image/${prompt}`;
  const redisCacheValue = await redisClient?.get(redisCacheKey);

  if (redisCacheValue) {
    console.log(`found image in cache`, prompt);
    return Promise.resolve(redisCacheValue);
  } else {
    console.log(`image not found in cache`, prompt);
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

  const imageRequestOptions: CreateImageRequest = {
    prompt,
    n: 1,
    size: `256x256`
  };

  return new Promise((resolve: (response: string) => void, reject) => {
    openai.createImage(imageRequestOptions).then((response) => {
      let data: string = response.data.data[0].url ?? ``;
      data = data.trim();
      redisClient?.set(redisCacheKey, data, {
        EX: ONE_WEEK_IN_SECONDS,
      });
      resolve(data);
    }).catch((error) => {
      reject(error);
      console.error(error);
    }).finally(() => {
      --numberOfActiveRequests;
    });

  });
}
