// Testing Pure Functions

// 💣 remove this todo test (it's only here so you don't get an error about missing tests)
// test.todo('remove me')

// 🐨 import the function that we're testing
// 💰 import {isPasswordAllowed} from '../auth'
import {isPasswordAllowed} from '../auth'

// 🐨 write tests for valid and invalid passwords
// 💰 here are some you can use:
//
// valid:
// - !aBc123
//
// invalid:
// - a2c! // too short
// - 123456! // no alphabet characters
// - ABCdef! // no numbers
// - abc123! // no uppercase letters
// - ABC123! // no lowercase letters
// - ABCdef123 // no non-alphanumeric characters

import cases from 'jest-in-case'

// **** MY SOLUTION START ****
cases(
  'isPasswordAllowed(password)',
  (opts) => {
    const result = isPasswordAllowed(opts.password)
    expect(result).toBe(opts.result)
  },
  {
    'valid password': {
      password: '!aBc123',
      result: true,
    },
    'invalid password too short': {
      password: 'a2c!',
      result: false,
    },
    'invalid password no alphabet characters': {
      password: '123456!',
      result: false,
    },
    'invalid password no numbers': {
      password: 'ABCdef!',
      result: false,
    },
    'invalid password no uppercase letters': {
      password: 'abc123!',
      result: false,
    },
    'invalid password no lowercase letters': {
      password: 'ABC123!',
      result: false,
    },
    'invalid password no non-alphanumeric characters': {
      password: 'ABCdef123',
      result: false,
    },
  },
)
// **** MY SOLUTION END ****

// **** PROF SOLUTION START ****
test('isPasswordAllowed returns true for valid passwords', () => {
  expect(isPasswordAllowed('!aBc123')).toBe(true)
})

test('isPasswordAllowed returns false for invalid passwords', () => {
  expect(isPasswordAllowed('a2c!')).toBe(false)
  expect(isPasswordAllowed('123456!')).toBe(false)
  expect(isPasswordAllowed('ABCdef!')).toBe(false)
  expect(isPasswordAllowed('abc123!')).toBe(false)
  expect(isPasswordAllowed('ABC123!')).toBe(false)
  expect(isPasswordAllowed('ABCdef123')).toBe(false)
}) 
// **** PROF SOLUTION END ****
