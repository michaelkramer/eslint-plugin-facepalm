const fs = require("fs"); 
const path = require("path");
module.exports = {
    meta: {
      type: "suggestion",
  
      docs: {
        description: "Missing copyright information.",
        category: "Best Practices",
        recommended: false,
      },
      fixable: "code",
      messages: {
        copyright: "This file is missing the copyright.",
        },
        schema: {
            type: "array",
            minItems: 0,
            maxItems: 2,
            items: [
                {
                    type: "string",
                }
            ]
        }
    },
    create: (context) => {
        let filePath = context.options[0];
        if (!filePath) {
            filePath = "./copyright.txt"
        }
      /**
     * Gets a fixer function to remove a given 'console.' directive.
     * @param {ASTNode} node The directive that should be removed
     * @returns {Function} A fixer function
     */
          function getFixFunction(node) {
            const matchingCopyright = fs.readFileSync(path.resolve(filePath),
            { encoding: "utf8", flag: "r"});
        return (fixer) => fixer.insertTextBefore(node, `/*\n${matchingCopyright}\n*/\n`);
    }
      return {
          Program(node) {
              const matchingCopyright = fs.readFileSync(path.resolve(filePath),
              { encoding: "utf8", flag: "r"});
              const trimedCopyright = matchingCopyright.replace(/\s/gmi, "");
              let hasCopyright = false;
              node.comments
                  .filter((item) => item.type === "Block")
                  .forEach((item) => {
                      if (item.value.replace(/\s/gmi,"") === trimedCopyright) {
                          hasCopyright = true;
                      }
                      return null;
                      
                  });
              if (!hasCopyright) {
                return context.report({
                    node,
                    messageId: "copyright",
                    fix: getFixFunction(node),
                  });
              }
        },
      };
    },
  };
  