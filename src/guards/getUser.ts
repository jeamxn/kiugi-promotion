import Elysia from "elysia";
import userService from "../service/userService";

export const getUserId = new Elysia()
  .use(userService)
  .guard({
    as: "scoped",
    isSignIn: true,
  })
  .resolve({ as: "scoped" }, ({ cookie: { token } }) => ({
    token: token.value,
  }));
