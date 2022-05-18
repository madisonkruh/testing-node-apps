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

// **** reduce duplication (extra credit) ****
// The "describe" block is used to group tests together in jest.
// Format: describe(description, code)
describe('isPasswordAlled only allows some passwords', () => {
  // create array of allowed password and array of disallowed passwords
  const allowedPasswords = ['!aBc123']
  const disallowedPasswords = [
    'a2c!', // too short
    '123456!', // no alphabet characters
    'ABCdef!', // no numbers
    'abc123!', // no uppercase letters
    'ABC123!', // no lowercase letters
    'ABCdef123', // no non-alphanumeric characters
  ]
  // dynamically create a test for each allowed password
  allowedPasswords.forEach((password) => {
    test(`allows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true)
    })
  })

  // dynamically create a test for each disallowed password
  disallowedPasswords.forEach((password) => {
    test(`disallows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(false)
    })
  })
})

// **** use jest in case (extra credit) ****
cases(
  'isPasswordAllowed: valid passwords',
  (opt) => {
    expect(isPasswordAllowed(opt.password)).toBe(true)
  },
  {
    'valid password': {
      password: '!aBc123',
    },
  },
)

cases(
  'isPasswordAllowed: invalid passwords',
  (opt) => {
    expect(isPasswordAllowed(opt.password)).toBe(false)
  },
  {
    'too short': {
      password: 'a2c!',
    },
    'no alphabet characters': {
      password: '123456!',
    },
    'no numbers': {
      password: 'ABCdef!',
    },
    'no uppercase letters': {
      password: 'abc123!',
    },
    'no lowercase letters': {
      password: 'ABC123!',
    },
    'no non-alphanumeric characters': {
      password: 'ABCdef123', 
    },
  },
)

// **** improved titles for jest-in-case ****
// lets say we want to know what specific passwords were used in the test
// we can include those in the title of the test so they are shown in terminal when test is run

// cases has the following format: cases(title, tester, testCases)
// this function takes in testCases as an argument
// it then accesses the name and password of each test case, and returns the new name (as well as the password unchanged)
function nameFormat(testCases) {
    return Object.entries(testCases).map(([name, password]) => {
        return {
            name: `${password} - ${name}`,
            password,
        }
    })
}

cases(
    'isPasswordAllowed: valid passwords',
    (opt) => {
      expect(isPasswordAllowed(opt.password)).toBe(true)
    }, 
    // call function nameFormat on test cases
    nameFormat ({
      'valid password': '!aBc123',
    }),
  )
  
  cases(
    'isPasswordAllowed: invalid passwords',
    (opt) => {
      expect(isPasswordAllowed(opt.password)).toBe(false)
    },
    // call function nameFormat on test cases
    nameFormat ({
      'too short': 'a2c!',
      'no alphabet characters': '123456!',
      'no numbers':'ABCdef!',
      'no uppercase letters': 'abc123!',
      'no lowercase letters': 'ABC123!',
      'no non-alphanumeric characters': 'ABCdef123', 
    }),
  )