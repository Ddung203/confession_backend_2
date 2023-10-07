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

app.use((err, req, res, next) => {
  console.error(err.message, err.stack);
  if (err.status === 400) {
    return res.status(400).json({
      statusCode: 400,
      message: err.message,
    });
  }
  return res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
    data: null,
  });
});

// app.use((req, res) => {
//   console.log(req);
//   res.status(400).json({ error: "BAD REQUEST" });
// });

app.listen(port, () => {});
