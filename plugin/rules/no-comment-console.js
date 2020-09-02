module.exports = {
  create: (context) => {
    return {
      Program(node) {
        node.comments
          .filter((item) => item.type === "Line")
          .forEach((item) => {
            const pattern = new RegExp("^\\s?console.*");
            if (pattern.test(item.value)) {
              return context.report(
                node,
                item.loc,
                `Did you just leave a commented 'console'?!?`
              );
            }
            return null;
          });
      },
    };
  },
};
