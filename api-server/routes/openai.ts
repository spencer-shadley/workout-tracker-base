import express from 'express';

import { askQuestion } from './askQuestion';

export const openAiRouter = express.Router()

openAiRouter.use(express.json());

openAiRouter.use((req, res, next) => {
  console.log(`--- OpenAi request ---`, Date.now())
  console.log(`req.body`, req.body)
  const body = req.body as OpenAiRequest;
  const prompt = body?.prompt;
  if (!prompt) {
    res.status(400).send({ error: `prompt is required` });
  }
  else if (typeof prompt !== `string`) {
    res.status(400).send({ error: `prompt must be a string` });
  } else {
    next()
  }
})

openAiRouter.get(`/quote/why-is-fitness-important`, async (req, res) => {
  const prompt = `Tell me why working out is important. Keep it somewhat short.`;
  try {
    const quote = await askQuestion(prompt);
    res.json(quote)
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e })
  }
})

openAiRouter.get(`/`, async (req, res) => {
  const prompt = req.body.prompt as string;

  try {
    const quote = await askQuestion(prompt);
    res.json(quote)
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e })
  }
})

interface OpenAiRequest {
    prompt: string;
}
