import {
  createPost,
  getPostById,
  hidePost,
  showPost,
} from "../controllers/post.controller.js";
import express from "express";

const router = express.Router();

const postRouter = (app) => {
  router.get("/posts/:id", getPostById);
  router.post("/posts", createPost);
  router.post("/posts/show", showPost);
  router.delete("/posts/hide", hidePost);

  app.use("/api/v1", router);
};

export default postRouter;
