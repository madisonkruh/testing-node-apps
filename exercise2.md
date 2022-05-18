EXERCISE 1 NOTES: (videos 7 - )

Middleware functions are functions that accept arguments like `request`,
`response`, and `next` and they're expected to either call a `response` method
to send a response to the caller, or call the `next` method to continue the
chain of middleware (ie. calls the next middleware function).

Express has several different types of middleware functions:
- Application-level middleware (our app isn't really using this kind)
- Router-level middleware (all our routes use this strategy of middleware)
- Error-handling middleware (this is what `error-middleware.js` is)
- Built-in middleware (we're not using any of these)
- Third-party middleware (we're using a few of these, like `cors`,
  `body-parser`, `express-jwt`, and `passport`).


Here's an example of a middleware function:

```javascript
function timeLogger(req, res, next) {
  console.log('Time:', Date.now())
  next()
}
```

One special case is for error middleware which acts as an error handler. For
that case, it also accepts an `error` argument.

```javascript
function errorHandler(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
}
```

Middleware have different purposes. For example, the `setListItem` middleware in
`src/routes/list-items-controller.js` is responsible for finding the requested
`listItem` by its ID, determining whether the current user is able to access
that `listItem`, add adding that `listItem` to the `req` so later middleware can
access it.