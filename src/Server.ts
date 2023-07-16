import express, { Request, Response } from "express";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});
const producer = kafka.producer();
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/send", async (req: Request, res: Response) => {
  await producer.connect();
  await producer.send({
    topic: "topic-test-1",
    messages: [{ value: `Hello KafkaJS user!` }],
  });
  res.send("Application Works");
});

app.listen(3000, () => {
  console.log("Application started on port 3000");
});
