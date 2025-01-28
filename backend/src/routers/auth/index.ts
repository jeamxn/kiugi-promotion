import User from "@back/models/user";
import error from "@back/utils/error";
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
  async ({ body, user, cookie }) => {
    const find = await user.findByUsername(body.username);
    if (!find) throw error.USER_NOT_FOUND;
    const isValid = await Bun.password.verify(body.password, find.password);
    if (!isValid) throw error.INVALID_PASSWORD;

    const refresh = await user.generateToken(find, "refresh");
    const access = await user.generateToken(find, "access");

    cookie.refresh_token.set({
      value: refresh,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookie.access_token.set({
      value: access,
      httpOnly: true,
      maxAge: 60 * 15,
      path: "/",
    });

    return {
      success: true,
    };
  },
  {
    body: "user",
    response: t.Object({
      success: t.Boolean(),
    }),
  },
);

AuthRouter.post(
  "refresh",
  async ({ cookie, user }) => {
    const refresh_token = cookie.refresh_token.value;
    if (!refresh_token) throw error.NO_REFRESH_TOKEN;
    const verify = await user.verifyToken(refresh_token);
    if (!verify) throw error.UNAUTHORIZED;

    const find = await user.findById(verify.id);
    if (!find) throw error.UNAUTHORIZED;

    const refresh = await user.generateToken(find, "refresh");
    const access = await user.generateToken(find, "access");

    cookie.refresh_token.set({
      value: refresh,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    cookie.access_token.set({
      value: access,
      httpOnly: true,
      maxAge: 60 * 15,
      path: "/",
    });

    return {
      success: true,
    };
  },
  {
    response: t.Object({
      success: t.Boolean(),
    }),
  },
);

export default AuthRouter;
