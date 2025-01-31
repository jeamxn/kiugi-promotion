import User from "@back/models/user";
import exit, { errorElysia } from "@back/utils/error";
import Elysia, { t } from "elysia";

const signin = new Elysia().use(User).post(
  "signin",
  async ({ body, user, error }) => {
    const isUsernameEmail = body.username.includes("@");
    if (!isUsernameEmail) {
      return exit(error, "INVALID_TYPE_USERNAME");
    }
    if (await user.findByUsername(body.username)) {
      return exit(error, "USER_ALREADY_EXISTS");
    }
    const created = await user.create({
      username: body.username,
      password: body.password,
    });
    return {
      success: true,
    };
  },
  {
    body: "user",
    response: {
      200: t.Object({
        success: t.Boolean(),
      }),
      ...errorElysia(["USER_ALREADY_EXISTS", "INVALID_TYPE_USERNAME"]),
    },
  },
);

export default signin;
