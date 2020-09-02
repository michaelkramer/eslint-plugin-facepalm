const Rule = require("../plugin/rules/no-comment-console");
const RuleTester = require("eslint").RuleTester;

const tester = new RuleTester({ parserOptions: { ecmaVersion: "2017" } });

tester.run("no-comment-console", Rule, {
  valid: ["const a = 2;"],
  invalid: [
    {
      code: `
      const a = 2;
      // console.log('something');
      `,
      errors: [
        {
          message: "Did you just leave a commented 'console'?!?",
        },
      ],
    },
  ],
});
