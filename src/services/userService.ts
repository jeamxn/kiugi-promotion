import User from "@/models/user";
import error from "@/utils/error";
import { Elysia } from "elysia";

const userService = new Elysia({ name: "user/service" })
  .state({
    user: {} as Record<string, string>,
    session: {} as Record<number, string>,
  })
  .model({})
  .decorate("user", User)
  .macro({
    isSignIn: (enabled: boolean) => {
      if (!enabled) return;
      return {
        beforeHandle: async ({ cookie, user }) => {
          const access_token = cookie.access_token.value;
          const verify = await user.verifyToken(access_token ?? "");
          if (!verify) {
            const refresh_token = cookie.refresh_token.value;
            if (!refresh_token) throw error.UNAUTHORIZED;
            const verifyR = await user.verifyToken(refresh_token);
            if (!verifyR) throw error.UNAUTHORIZED;
            const find = await user.findById(verifyR.id);
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
          }
        },
      };
    },
  });

export default userService;
