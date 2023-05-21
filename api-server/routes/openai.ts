import express from 'express';

import { askQuestion } from './askQuestion';

export const openAiRouter = express.Router()

openAiRouter.use(express.json());

openAiRouter.use((req, res, next) => {
  console.log(`--- OpenAi request ---`, Date.now())

  const prompt = req.query?.prompt as string;

  console.log(`prompt`, prompt)
  if (!prompt) {
    res.status(400).send({ error: `prompt is required` });
  }
  else if (typeof prompt !== `string`) {
    res.status(400).send({ error: `prompt must be a string` });
  }
  else if (req.query?.temperature) {
    const temperature = Number(req.query?.temperature);
    console.log(`temperature`, temperature);
    if (isNaN(temperature)) {
      res.status(400).send({ error: `temperature must be a number` } );
    }

    next();
  }
  else {
    next()
  }
})

openAiRouter.get(`/`, async (req, res) => {
  const prompt = req.query.prompt as string;
  const temperature = Number(req.query.temperature) ?? undefined;

  try {
    const answer = await askQuestion(prompt, { temperature });
    console.log(`--- answer to ${prompt}`, answer);
    res.send(answer)
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e })
  }
})

