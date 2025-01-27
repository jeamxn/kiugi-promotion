import Elysia, { t } from "elysia";
import { getUserId } from "../guards/getUser";

class Note {
  constructor(public name: string = "Note") {}
  get() {
    return {
      message: this.name,
    };
  }
}

const router = new Elysia({
  name: "Elysia",
  prefix: "/api",
})
  .decorate("v1", new Note())
  .use(getUserId)
  .get(
    "v1/:index",
    ({ v1, params, token }) => {
      return {
        params,
        token,
        v1: v1.get(),
      };
    },
    {
      params: t.Object({
        index: t.Number(),
      }),
    },
  );

export default router;
