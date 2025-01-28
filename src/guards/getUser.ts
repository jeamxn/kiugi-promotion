import Elysia from "elysia";
import userService from "../services/userService";

export const getUserId = new Elysia()
  .use(userService)
  .guard({
    isSignIn: true,
  })
  .resolve(({ cookie: { token } }) => ({
    token: token.value,
  }))
  .as("plugin");
