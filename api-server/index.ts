import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import next from 'next';
import { createClient, RedisClientType } from 'redis';

import { openAiRouter } from './routes/openai';
import { youtubeRouter } from './routes/youtube';

const dev = process.env.NODE_ENV !== `production`;
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const pathname = __dirname + `/.env`;
dotenv.config({ path: pathname });

(async () => {
  try {
    await app.prepare();

    const server = express();

    server.use(`/openai`, openAiRouter);
    server.use(`/api/youtube`, youtubeRouter);

    server.all(`*`, (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: unknown) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

export let redisClient: RedisClientType | undefined;

(async () => {
  const redisPassword = process.env.REDIS_PASSWORD;
  const redisHost = process.env.REDIS_HOST;
  const redisPort = Number(process.env.REDIS_PORT);

  if (redisPassword && redisHost && redisPort) {
    redisClient = createClient({
      password: redisPassword,
      socket: {
        host: redisHost,
        port: redisPort
      }
    });
    await redisClient.connect();
    redisClient.on(`connect`, () => console.log(`Redis connected`));
    redisClient.on(`error`, (error) => console.error(`Redis error`, error));
  } else {
    console.error(`Missing redis config. Please update the .env file`);
  }
})();
