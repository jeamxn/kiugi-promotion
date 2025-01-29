import getUserInfo from "@back/guards/getUserInfo";
import { errorElysia } from "@back/utils/error";
import Elysia, { t } from "elysia";

const OpenaiRouter = new Elysia({
  name: "Open AI Router",
  prefix: "openai",
}).use(getUserInfo);

OpenaiRouter.post(
  "chat",
  ({ body, userInfo }) => {
    return {
      token: body.text,
      userInfo,
    };
  },
  {
    isSignIn: true,
    body: t.Object({
      text: t.String(),
    }),
    response: {
      200: t.Object({
        token: t.String(),
        userInfo: t.Object({
          username: t.String(),
        }),
      }),
      ...errorElysia([], {
        isSignIn: true,
      }),
    },
  },
);

export default OpenaiRouter;
