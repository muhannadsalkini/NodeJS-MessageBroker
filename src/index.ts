import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import Redis from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const redisClient = new Redis({
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: 19522,
});

app.use(bodyParser.json());

// Producer
app.post("/produce", async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  await redisClient.rpush("messageQ", message);
  res.json({ success: true, message: "Message produced successfully" });
});

// Consumer
app.get("/consume", async (req: Request, res: Response) => {
  // The lpop operation is not atomic, meaning there is a chance of a race condition if multiple consumers try to pop.
  // By using MULTI and EXEC, the lpop operation is now atomic preventing race conditions.
  const result = await redisClient.multi().lpop("messageQ").exec();

  const message = result[0][1];

  if (message !== null) {
    res.json({ success: true, message });
  } else {
    res.json({ success: false, message: "No messages in the queue" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "test route" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
