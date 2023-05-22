import express from 'express';
import { matchedData, query, validationResult } from 'express-validator';

import { askQuestion } from './askQuestion';

export const openAiRouter = express.Router()

openAiRouter.use(express.json());

openAiRouter.get(
  `/`,
  query(`prompt`).notEmpty().isString(),
  query(`temperature`).optional().isNumeric(),
  async (req, res) => {
    console.log(`--- OpenAi request ---`, Date.now())

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const { prompt, temperature: rawTemperature } = matchedData(req);
      const temperature = Number(rawTemperature) ?? undefined;
      console.log(`prompt`, prompt);
      console.log(`temperature`, temperature);
      try {
        const answer = await askQuestion(prompt, { temperature: temperature });
        console.log(`--- answer to ${prompt}`, answer);
        res.send(answer)
      } catch (e) {
        console.error(e);
        res.status(500).send({ error: e })
      }
    } else {
      res.status(400).send({ error: errors.array() })
    }
  })

