const { RuleTester } = require('eslint');

const { rules } = require('../src');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-date-fns', rules['no-date-fns'], {
  valid: [{
    code: 'const test = require("test");',
  }, {
    code: 'const test = require("test-date-fns");',
  }],
  invalid: [{
    code: 'const dateFns = require("date-fns");',
    errors: [{ message: 'Deprecated require of date-fns package, use saddlebag-date package instead.' }],
  }, {
    code: 'import dateFns from "date-fns";',
    errors: [{ message: 'Deprecated import of date-fns package, use saddlebag-date package instead.' }],
  }],
});
