EXERCISE 1 NOTES: (videos 1 - 6)


NOTE 1: Basic Solution
Terminologies in Jest:
- test
- expect
- matches (toBe, not.toBe, toEqual, etc)


We can write tests by using a function provided by Jest called test.
It takes in two parameters, 
    1. a definition of what the test is going to do.
    2. a function with the actual test. We use ‘expect’ and ‘matchers’ within this function.

```javascript
import {isPasswordAllowed} from '../auth'

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
```



NOTE 2: Solution to redue duplication
The "describe" block is used to group tests together in jest.
Format: describe(description, function with tests)

```javascript
import {isPasswordAllowed} from '../auth'

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
```



NOTE 3: Using jest-in-case
jest-in-case is a Jest utility that allows you to create variations of the same test.
In this example, we made test cases for allowed passwords and cases for disallowed passwords.
Note that cases allows us to include a title for each test case in the cases.

To use, import cases from 'jest-in-case'. You can then use cases with the following format:
cases(title, tester, testCases);

```javascript
import {isPasswordAllowed} from '../auth'
import cases from 'jest-in-case'

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
```



NOTE 4: Improved titles for jest-in-case
Lets say we want to know what specific passwords were used in the tests as input.
To do this, we can include them in the name/title of the test (so they are shown in terminal when test is run).

We created the function nameFormat to modify the name of each test such that it includes the specific password input.

Cases has the following format: cases(title, tester, testCases)
The function nameFormat takes in testCases as an argument
It then accesses the name and password of each test case, and returns the new name (as well as the password unchanged).

```javascript
import {isPasswordAllowed} from '../auth'
import cases from 'jest-in-case'

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
  ```