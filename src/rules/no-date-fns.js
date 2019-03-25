const { deprecated } = require('./messages');

module.exports = {
  create: context => ({
    CallExpression: (node) => {
      if (node.callee.name === 'require'
          && node.arguments.length > 0
          && typeof node.arguments[0].value === 'string'
          && node.arguments[0].value.indexOf('date-fns') === 0
      ) {
        context.report(node, deprecated('require of date-fns package'));
      }
    },
    ImportDeclaration: (node) => {
      if (node.source.value.indexOf('date-fns') >= 0) {
        context.report(node, deprecated('import of date-fns package'));
      }
    },
  }),
  meta: {
    docs: {
      description: 'Deprecate the use of date-fns module in favour of saddlebag-date npm package',
    },
    type: 'problem',
  },
};
