import HttpStatusCode from "./HttpStatusCode.js";
import BaseError from "./baseError.js";

class Api404Error extends BaseError {
  constructor(
    description,
    statusCode = HttpStatusCode.NOT_FOUND,
    name = "NOT_FOUND",
    isOperational = true
  ) {
    super(description, statusCode, name, isOperational);
  }
}

export default Api404Error;
