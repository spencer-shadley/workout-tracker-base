import express from 'express';
import { matchedData, query, validationResult } from 'express-validator';
import youtubeSearch from 'youtube-search';

export const youtubeRouter = express.Router()

youtubeRouter.use(express.json());

youtubeRouter.get(`/`, query(`exercise`).notEmpty().isString(), (req, res) => {
  console.log(`--- YouTube request ---`, Date.now())

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send({ error: errors.array() })
    return;
  }

  const { exercise } = matchedData(req);
  console.log(`--- video search for exercise`, exercise);

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
        res.send(results[0].link);
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

