import express from 'express';
import { matchedData, query, validationResult } from 'express-validator';
import youtubeSearch from 'youtube-search';

import { redisClient } from '../redisClient';

const ONE_MONTH_IN_SECONDS = 60 * 60 * 24 * 30;

export const youtubeRouter = express.Router()

youtubeRouter.use(express.json());

youtubeRouter.get(`/`, query(`exercise`).notEmpty().isString(), async (req, res) => {
  console.log(`--- YouTube request ---`, Date.now())

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send({ error: errors.array() })
    return;
  }

  const { exercise } = matchedData(req);
  console.log(`--- video search for exercise`, exercise);

  const redisCacheKey = `youtube/${prompt}`;
  const redisCacheValue = await redisClient?.get(redisCacheKey);

  if (redisCacheValue) {
    console.log(`found video url in cache`, prompt);
    return Promise.resolve(redisCacheValue);
  } else {
    console.log(`video url not found in cache`, prompt);
  }

  try {
    const opts: youtubeSearch.YouTubeSearchOptions = {
      maxResults: 1,
      key: process.env.YOUTUBE_KEY,
      type: `video`,
    };

    youtubeSearch(`how to do ${exercise}`, opts, (err, results) => {
      if (err) {
        res.status(500).send({ error: err });
        return;
      }

      console.dir(`video results`, results);
      if (results?.length) {
        const link = results[0].link;
        redisClient?.set(redisCacheKey, link, {
          EX: ONE_MONTH_IN_SECONDS,
        });
        res.send(link);
        return;
      }

      const errorMessage = `No video found for exercise ${exercise}`;
      console.error(errorMessage);
      res.status(400).send({ error: errorMessage });
      return;
    });
  }
  catch (e) {
    console.error(e);
    res.status(500).send({ error: e });
    return;
  }
});

