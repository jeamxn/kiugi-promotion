import getUserInfo from "@back/guards/getUserInfo";
import { Me } from "@common/responses";
import Elysia, { t } from "elysia";

const me = new Elysia().use(getUserInfo).get(
  "me",
  async ({ userInfo }): Promise<Me> => {
    return {
      id: userInfo.id,
      username: userInfo.username,
    };
  },
  {
    response: {
      200: t.Object({
        id: t.String(),
        username: t.String(),
      }),
    },
  },
);

export default me;
