import {
  getUsers,
  getUserById,
  getUserByDeviceId,
} from "../controllers/user.controller.js";
import express from "express";
const router = express.Router();
const userRouter = (app) => {
  router.get("/users", getUsers);

  router.get("/users/:id", getUserById);

  router.post("/users/device", getUserByDeviceId);

  app.use("/api/v1", router);
};

export default userRouter;
