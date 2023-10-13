// errorHandler.js

import { error as _error } from "./logger.js";
import BaseError from "./baseError.js";

function logError(err) {
  _error(err);
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message);
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

export default {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
