import express from "express";
import bodyParser from "body-parser";
import "dotenv/config.js";

//router
import userRouter from "./routers/user.routers.js";
import authRouter from "./routers/auth.router.js";
import postRouter from "./routers/post.router.js";

//middleware
import appMiddleware from "./middlewares/app.middleware.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

authRouter(app);
userRouter(app);
postRouter(app);

app.use(appMiddleware);

app.listen(port, () => {});
