import { Elysia } from "elysia";

const userService = new Elysia({ name: "user/service" })
  .state({
    user: {} as Record<string, string>,
    session: {} as Record<number, string>,
  })
  .model({})
  .macro({
    isSignIn: (enabled: boolean) => {
      if (!enabled) return;

      return {
        beforeHandle({ error, cookie: { token } }) {
          if (!token.value) {
            return error(401, {
              success: false,
              message: "Unauthorized",
            });
          }
        },
      };
    },
  });

export default userService;
