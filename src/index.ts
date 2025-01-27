import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import router from "./app/router";

const app = new Elysia()
  .use(swagger())
  .use(router)
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
