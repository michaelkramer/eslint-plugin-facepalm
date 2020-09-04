module.exports = {
  meta: {
    type: "suggestion",

    docs: {
      description: "Code that should be removed before pushing to repo.",
      category: "Best Practices",
      recommended: false,
    },

    fixable: "code",
    messages: {
      value: "Did you just leave a commented 'console.log'?",
    },
  },
  create: (context) => {
    /**
     * Gets a fixer function to remove a given 'console.' directive.
     * @param {ASTNode} node The directive that should be removed
     * @returns {Function} A fixer function
     */
    function getFixFunction(node) {
      return (fixer) => fixer.remove(node);
    }
    return {
      Program(node) {
        node.comments
          .filter((item) => item.type === "Line")
          .forEach((item) => {
            const pattern = new RegExp("^\\s?console.*");
            if (pattern.test(item.value)) {
              return context.report({
                node,
                messageId: "value",
                loc: item.loc,
                fix: getFixFunction(item),
              });
            }
            return null;
          });
      },
    };
  },
};
