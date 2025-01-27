import Elysia, { t } from "elysia";
import { getUserId } from "../guards/getUser";

const Note = () => {
  return {
    data: [
      { id: 1, title: "Hello, Elysia!" },
      { id: 2, title: "Hello, World!" },
    ],
  };
};

const router = new Elysia({
  name: "Elysia",
  prefix: "/api",
})
  .decorate("v1", Note)
  .use(getUserId)
  .get(
    "v1/:index",
    ({ v1, params, token }) => {
      return {
        params,
        token,
      };
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
    },
  );

export default router;
