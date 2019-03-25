const { rules } = require('../src');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
});

ruleTester.run('no-new-date-with-args', rules['no-new-date-with-args'], {
  valid: [{
    code: 'const a = Date.now()',
  }, {
    code: 'const date = new Date()',
  }],
  invalid: [{
    code: 'const date = new Date(1234);',
    errors: [{ message: 'Deprecated new Date(args) expression, use saddlebag-date package instead, for more info: https://github.skyscannertools.net/dingo/eslint-plugin-skyscanner-dates' }],
  }, {
    code: 'const date = new Date("Fri Mar 08 2019 15:46:56 GMT+0000 (Greenwich Mean Time)");',
    errors: [{ message: 'Deprecated new Date(args) expression, use saddlebag-date package instead, for more info: https://github.skyscannertools.net/dingo/eslint-plugin-skyscanner-dates' }],
  }, {
    code: 'const arg = 7; const date = new Date(arg);',
    errors: [{ message: 'Deprecated new Date(args) expression, use saddlebag-date package instead, for more info: https://github.skyscannertools.net/dingo/eslint-plugin-skyscanner-dates' }],
  }],
});
