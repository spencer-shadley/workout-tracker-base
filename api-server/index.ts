import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import next from 'next';

import { openAiRouter } from './routes/openai';

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
