import Elysia, { t } from "elysia";

const OpenaiRouter = new Elysia({
  name: "Open AI Router",
  prefix: "openai",
});

OpenaiRouter.post(
  "chat",
  ({ body }) => {
    return {
      token: body.text,
    };
  },
  {
    body: t.Object({
      text: t.String(),
    }),
    response: t.Object({
      token: t.String(),
    }),
  },
);

export default OpenaiRouter;
