import express from 'express';

import { askQuestion } from './askQuestion';

export const youtubeRouter = express.Router()

youtubeRouter.use(express.json());

youtubeRouter.use((req, res, next) => {
  console.log(`--- YouTube request ---`, Date.now())

  const exerciseName = req.query?.exercise as string;
  console.log(`exercise`, exerciseName)

  if (!exerciseName) {
    res.status(400).send({ error: `exercise is required` });
  }
  else if (typeof exerciseName !== `string`) {
    res.status(400).send({ error: `exercise must be a string` });
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

youtubeRouter.get(`/`, async (req, res) => {
})

