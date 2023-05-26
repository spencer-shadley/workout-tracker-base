import { createClient, RedisClientType } from 'redis';

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
