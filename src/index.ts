import { swagger } from "@elysiajs/swagger";
import Bun from "bun";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import IndexRouter from "./routers";

mongoose.connect(Bun.env.MONGODB_URI ?? "");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = new Elysia();

app.use(swagger());
app.use(IndexRouter);
app.onError(({ error, code }) => {
  if (code === "NOT_FOUND") return;

  console.error(error);
});

app.listen(8000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
