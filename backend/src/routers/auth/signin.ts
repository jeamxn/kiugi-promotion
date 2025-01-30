import User from "@back/models/user";
import exit, { errorElysia } from "@back/utils/error";
import Elysia, { t } from "elysia";

const signin = new Elysia().use(User).post(
  "signin",
  async ({ body, user, error }) => {
    if (await user.findByUsername(body.username)) {
      return exit(error, "USER_ALREADY_EXISTS");
    }
    const created = await user.create({
      username: body.username,
      password: body.password,
    });
    return {
      token: created?.id,
    };
  },
  {
    body: "user",
    response: {
      200: t.Object({
        token: t.String(),
      }),
      ...errorElysia(["USER_ALREADY_EXISTS"]),
    },
  },
);

export default signin;
