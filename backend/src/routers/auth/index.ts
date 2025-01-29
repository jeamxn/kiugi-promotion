import User from "@back/models/user";
import exit, { errorElysia } from "@back/utils/error";
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

AuthRouter.post(
  "login",
  async ({ body, user, cookie, error }) => {
    const find = await user.findByUsername(body.username);
    if (!find) return exit(error, "USER_NOT_FOUND");
    const isValid = await Bun.password.verify(body.password, find.password);
    if (!isValid) return exit(error, "INVALID_PASSWORD");

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
    response: {
      200: t.Object({
        success: t.Boolean(),
      }),
      ...errorElysia(["USER_NOT_FOUND", "INVALID_PASSWORD"]),
    },
  },
);

AuthRouter.post(
  "refresh",
  async ({ cookie, user, error }) => {
    const refresh_token = cookie.refresh_token.value;
    if (!refresh_token) return exit(error, "NO_REFRESH_TOKEN");
    const verify = await user.verifyToken(refresh_token);
    if (!verify) return exit(error, "UNAUTHORIZED");

    const find = await user.findById(verify.id);
    if (!find) return exit(error, "UNAUTHORIZED");

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
    response: {
      200: t.Object({
        success: t.Boolean(),
      }),
      ...errorElysia(["NO_REFRESH_TOKEN", "UNAUTHORIZED"]),
    },
  },
);

export default AuthRouter;
