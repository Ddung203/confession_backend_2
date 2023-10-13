import express from "express";
import bodyParser from "body-parser";
import "dotenv/config.js";
import morgan from "morgan";

//router
import userRouter from "./routers/user.routers.js";
import authRouter from "./routers/auth.router.js";
import postRouter from "./routers/post.router.js";
import useDetailRouter from "./routers/user_detail.router.js";
//middleware
import errorHandler from "./middlewares/error.middleware.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));

authRouter(app);
userRouter(app);
postRouter(app);
useDetailRouter(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listen port ${port}`);
});
