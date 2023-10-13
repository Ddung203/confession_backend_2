import Api404Errors from "../exceptions/api404Error.js";

const errorHandler = (err, req, res, next) => {
  // console.log(err);
  if (err instanceof Api404Errors) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      // name: err.name,
      // stack: err.stack,
    });
  } else {
    console.error("Unhandled error:", err.stack);
    return res.status(500).json({
      statusCode: 500,
      description: "Internal Server Error",
    });
  }
};

export default errorHandler;
