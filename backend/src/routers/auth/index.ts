import Elysia from "elysia";
import check from "./check";
import login from "./login";
import logout from "./logout";
import refresh from "./refresh";
import signin from "./signin";

const AuthRouter = new Elysia({
  name: "Auth Router",
  prefix: "auth",
})
  .use(signin)
  .use(login)
  .use(logout)
  .use(refresh)
  .use(check);

export default AuthRouter;
