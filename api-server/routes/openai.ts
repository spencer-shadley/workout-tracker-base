import express from 'express';

import { askQuestion } from './askQuestion';

export const openAiRouter = express.Router()

openAiRouter.use((req, res, next) => {
  console.log(`Time: `, Date.now())
  next()
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

