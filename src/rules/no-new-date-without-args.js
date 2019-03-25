const { deprecated } = require('./messages');

module.exports = {
  create: context => ({
    NewExpression: (node) => {
      if (node.callee.name === 'Date' && node.arguments.length === 0) {
        context.report(node, deprecated('new Date() expression'));
      }
    },
  }),
  meta: {
    docs: {
      description: 'Deprecate new Date() expression in favour of saddlebag-date npm package',
    },
    type: 'problem',
  },
};

