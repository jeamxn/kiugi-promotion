import error from "@/utils/error";
import Elysia from "elysia";
import userService from "../services/userService";

const getUserInfo = new Elysia()
  .use(userService)
  .guard({
    isSignIn: true,
  })
  .resolve(async ({ cookie, user }) => {
    const access_token = cookie.access_token.value;
    if (!access_token) {
      throw error.UNAUTHORIZED;
    }
    const verify = await user.verifyToken(access_token);
    if (!verify) throw error.UNAUTHORIZED;
    const userSearch = await user.findById(verify.id);
    const userInfo = { ...userSearch?.toObject() };
    delete userInfo.password;
    return {
      userInfo: userInfo,
    };
  })
  .as("plugin");

export default getUserInfo;
