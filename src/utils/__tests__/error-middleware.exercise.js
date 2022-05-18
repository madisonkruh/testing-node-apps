// Testing Middleware

// 💣 remove this todo test (it's only here so you don't get an error about missing tests)
// test.todo('remove me')

// 🐨 you'll need both of these:
// import {UnauthorizedError} from 'express-jwt'
// import errorMiddleware from '../error-middleware'
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
// 💰 const error = new UnauthorizedError('some_error_code', {message: 'Some message'})
// 💰 const res = {json: jest.fn(() => res), status: jest.fn(() => res)}

// for this case we are supposed to have a response status of 401, and calling .json with some error code and error message?
test('An UnauthorizedError was thrown by the express-jwt middleware', () => {
  // NOTE: VERY confused by all of this

  // we start by calling errorMiddleware function with an error, req, res, next
  // these parameters we pass will be fake versions we make for testing

  // in this case, we know error needs to be an instance of UnauthorizedError,
  // so lets create that (provided by 💰 note above) (modified to make cleaner)
  const code = 'some_error_code' // some fake code
  const message = 'Some message' // some fake message
  const error = new UnauthorizedError(code, {message})

  // our res here is an object that contains a json and a status, each which are fake functions that return the res itself
  // (provided by 💰 note above)
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}

  // made req an empty object because not used here anyway
  const req = {}

  // made next that is just a jest function becaue also not used
  const next = jest.fn()

  // call errorMiddleware with error, req, res, next values we created and ensure it handles them as expected
  errorMiddleware(error, req, res, next)

  // ensure next is not called
  expect(next).not.toHaveBeenCalled()

  // ensure res status is called with 401
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1) // ensure res.status only called with error once

  // ensure res json is called with error.code property and error.message property
  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message,
  })

  expect(res.json).toHaveBeenCalledTimes(1) // ensure res.json only called once
})

// 🐨 Write a test for the headersSent case
test('Calls next if headersSent is true', () => {
  // we start by calling errorMiddleware function with an error, req, res, next
  // these parameters we pass will be fake versions we make for testing

  // made req an empty object because not used here
  const req = {}

  // made next just a jest function
  const next = jest.fn()

  // this time make error simple instance of Error
  const message = 'Some message' // some fake message
  const error = new Error(message)

  // same as before but set headersSent to true
  // do we always need a json and status?
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
    headersSent: true,
  }

  // call errorMiddleware with error, req, res, next values we created and ensure it handles them as expected
  errorMiddleware(error, req, res, next)

  // ensure next is called with error
  expect(next).toHaveBeenCalledWith(error)
  expect(next).toHaveBeenCalledTimes(1) // ensure next only called once

  // ensure res status is not called
  expect(res.status).not.toHaveBeenCalled()

  // ensure res jsonis not called
  expect(res.json).not.toHaveBeenCalled()
})

// 🐨 Write a test for the else case (responds with a 500)
test('responds with 500 and the error object', () => {
  // we start by calling errorMiddleware function with an error, req, res, next
  // these parameters we pass will be fake versions we make for testing

  // made req an empty object because not used here
  const req = {}

  // made next just a jest function
  const next = jest.fn()

  // made error simple instance of Error
  const message = 'Some message' // some fake message
  const error = new Error(message)

  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
  }

  // call errorMiddleware with error, req, res, next values we created and ensure it handles them as expected
  errorMiddleware(error, req, res, next)

  // ensure next is not called
  expect(next).not.toHaveBeenCalled()

  // ensure res status is called with 500
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.status).toHaveBeenCalledTimes(1) // ensure res.status only called with error once

  // ensure res json is called with error.message property and error.stack
  expect(res.json).toHaveBeenCalledWith({
    message: error.message,
    stack: error.stack,
  })

  expect(res.json).toHaveBeenCalledTimes(1) // ensure res.json only called once
})
