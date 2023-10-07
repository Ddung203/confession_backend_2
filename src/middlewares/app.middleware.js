// const appMiddleware = (err, req, res, next) => {
//   console.error(err.message, err.stack);
//   if (err === 400) {
//     return res.status(400).json({
//       statusCode: 400,
//       message: "Bad Request.",
//     });
//   }
//   if (err) {
//     return res.status(500).json({
//       statusCode: 500,
//       message: "Internal Server Error",
//       data: null,
//     });
//   }
// };
// export default appMiddleware;

const appMiddleware = (req, res, next) => {
  const err = new Error("Bad Request");
  err.status = 400;

  next(err);
};

export default appMiddleware;
