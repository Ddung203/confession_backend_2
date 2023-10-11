import UserModel from "../models/user.model.js";
import Api404Error from "../exceptions/api404Error.js";

const signIn = async (req, res, next) => {
  try {
    const deviceId = req.body.deviceId;
    if (!deviceId) {
      throw new Api404Error("Invalid request. Missing deviceId.");
    }
    const users = await UserModel.findByDeviceId(deviceId);
    if (!users || users.length < 1) {
      // throw new Api404Error(
      //   `User not 2 found with deviceId: ${deviceId}`,
      //   400,
      //   "UserNotFound"
      // );
      throw new Api404Error(`User not found with deviceId: ${deviceId}`);
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Sign in successful.",
      data: UserModel.response(users[0]),
    });
  } catch (err) {
    console.error("Error while signing in", err.stack);
    next(err);
  }
};

const signUp = async (req, res, next) => {
  const { name, image, deviceId } = req.body;
  if (!name || name.trim() == "" || !deviceId || deviceId.trim() == "") {
    next(400);
  }
  try {
    var users = await UserModel.findByDeviceId(deviceId);
    if (users && users.length > 0) {
      throw new Api404Error(
        "The name or device id is exsisted.",
        409,
        "CONFLICT"
      );
    } else {
      users = await UserModel.findByName(name);
      if (users && users.length > 0) {
        throw new Api404Error(
          "The name or device id is exsisted.",
          409,
          "CONFLICT"
        );
      }
    }
    const userModel = new UserModel(name, image, deviceId);
    await userModel.create();
    users = await UserModel.findByDeviceId(deviceId);
    return res.status(201).json({
      statusCode: 201,
      message: "Sign up successful.",
      data: UserModel.response(users[0]),
    });
  } catch (err) {
    console.error("Error while signing up", err.message);
    next(err);
  }
};

export { signIn, signUp };
