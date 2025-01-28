import getUserInfo from "@back/guards/getUserInfo";
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
  },
);

export default OpenaiRouter;
