import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import router from "./app/router";

const app = new Elysia()
  .use(swagger())
  .use(router)
  .onError(({ error, code }) => {
    if (code === "NOT_FOUND") return;
    console.error(error);
  })
  .listen(8000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
