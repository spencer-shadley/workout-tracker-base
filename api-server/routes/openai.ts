import express from 'express';
import { matchedData, query, validationResult } from 'express-validator';

import { askQuestion } from './askQuestion';
import { generateImage } from './generateImage';

export const openAiRouter = express.Router()

openAiRouter.use(express.json());

openAiRouter.get(
  `/text`,
  query(`prompt`).notEmpty().isString(),
  query(`temperature`).optional().isNumeric(),
  query(`skipCache`).optional().isBoolean(),
  async (req, res) => {
    console.log(`--- OpenAi request ---`, Date.now())

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ error: errors.array() })
      return;
    }

    const { prompt, temperature: rawTemperature, skipCache } = matchedData(req);
    const temperature = Number(rawTemperature) ?? undefined;
    console.log(`prompt`, prompt);
    try {
      const answer = await askQuestion(prompt, skipCache, { temperature });
      console.log(`--- answer to ${prompt} --- \n`, answer);
      res.send(answer)
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: e })
    }
  })

openAiRouter.get(
  `/generateImage`,
  query(`prompt`).notEmpty().isString(),
  async (req, res) => {
    console.log(`--- OpenAi image request ---`, Date.now())

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ error: errors.array() })
    }

    const { prompt } = matchedData(req);
    console.log(`prompt`, prompt);
    try {
      const imageUrl = await generateImage(prompt);
      console.log(`--- image to ${prompt}`, imageUrl);
      res.send(imageUrl)
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: e })
    }
  })
