import { Queue, Worker } from "bullmq";

// Create a new connection in every instance
const analyzeQueue = new Queue("queue", {
  connection: {
    host: process.env.REDIS_URL,
    port: 32856,
  },
});

const analyzeWorker = new Worker("myqueue", async (job) => {}, {
  connection: {
    host: process.env.REDIS_URL,
    port: 32856,
  },
});
