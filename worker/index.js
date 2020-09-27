const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

const sub = redisClient.duplicate();

const fib = (index) => {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
};

sub.on("message", (channel, message) => {
  const result = fib(parseInt(message));
  console.log("WORKER on message", message, result);
  const res = redisClient.hset("values", message, result);
  console.log("WORKER on hset", res);
});

sub.subscribe("insert");
