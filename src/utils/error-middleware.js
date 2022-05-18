import {UnauthorizedError} from 'express-jwt'

function errorMiddleware(error, req, res, next) {
  // An error was thrown, but a response has already been sent (so we don't need to send another one).
  if (res.headersSent) {
    next(error)
  // An `UnauthorizedError` was thrown by the `express-jwt` middleware
  } else if (error instanceof UnauthorizedError) {
    res.status(401)
    res.json({code: error.code, message: error.message})
  // An unknown error was thrown and no response has been sent yet
  } else {
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
}

export default errorMiddleware
