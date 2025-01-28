import User from "@/models/user";
import error from "@/utils/error";
import Bun from "bun";
import Elysia, { t } from "elysia";

const AuthRouter = new Elysia({
  name: "Auth Router",
  prefix: "auth",
})
  .decorate("user", User)
  .use(User.elysia);

AuthRouter.post(
  "signin",
  async ({ body, user }) => {
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
    response: t.Object({
      token: t.String(),
    }),
  },
);

AuthRouter.post(
  "login",
  async ({ body, user }) => {
    const find = await user.findByUsername(body.username);
    if (!find) throw error.USER_NOT_FOUND;

    const isValid = await Bun.password.verify(body.password, find.password);
    if (!isValid) throw error.INVALID_PASSWORD;

    return {
      token: find?._id.toString() ?? "",
    };
  },
  {
    body: "user",
    response: t.Object({
      token: t.String(),
    }),
  },
);

export default AuthRouter;
