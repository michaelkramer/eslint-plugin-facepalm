const reservedWords = [
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  // This is one that will give a lot of false positives
  // 'false',
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  // This is one that will give a lot of false positives
  // 'in',
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  // This is one that will give a lot of false positives
  // 'new',
  "null",
  "package",
  // This is one that will give a lot of false positives
  // 'private',
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  // This is one that will give a lot of false positives
  // 'true',
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
];
/**
 * Gets a fixer function to remove a given 'use strict' directive.
 * @param {ASTNode} node The directive that should be removed
 * @returns {Function} A fixer function
 */
function getFixFunction(node) {
  return (fixer) => fixer.remove(node);
}
module.exports = {
  meta: {
    type: "suggestion",

    docs: {
      description: "Code that should be removed before pushing to repo.",
      category: "Best Practices",
      recommended: false,
    },

    messages: {
      useless: "Possible useless comment?",
    },
  },
  create: (context) => {
    function specialCases(word) {
      switch (word) {
        case "for":
        case "until":
        case "while":
        case "with":
          return RegExp(`^\\s*${word}\\s?\\(`);
        case "do":
          return RegExp(`^\\s*${word}\\s?\\{`);
        case "this":
          return RegExp(`^\\s*${word}\\.`);
        default:
          return RegExp(`^\\s*${word}\\s`);
      }
    }

    return {
      Program(node) {
        node.comments
          .filter((item) => item.type === "Line")
          .forEach((item) => {
            reservedWords.forEach((word) => {
              const pattern = specialCases(word);

              if (pattern.test(item.value)) {
                return context.report({
                  node,
                  loc: item.loc,
                  messageId: "useless",
                });
              }
            });
            return null;
          });
      },
    };
  },
};
