const { RuleTester } = require('eslint');

const { rules } = require('../src');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

ruleTester.run('no-moment', rules['no-moment'], {
  valid: [{
    code: 'const test = require("test");',
  }, {
    code: 'const test = require("a-moment");',
  }],
  invalid: [{
    code: 'const moment = require("moment");',
    errors: [{ message: 'Deprecated require of moment package, use saddlebag-date package instead, for more info: https://github.skyscannertools.net/dingo/eslint-plugin-skyscanner-dates' }],
  }, {
    code: 'import moment from "moment";',
    errors: [{ message: 'Deprecated import of moment package, use saddlebag-date package instead, for more info: https://github.skyscannertools.net/dingo/eslint-plugin-skyscanner-dates' }],
  }],
});
