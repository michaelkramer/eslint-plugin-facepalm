const Rule = require("../plugin/rules/no-useless-comments");
const RuleTester = require("eslint").RuleTester;

const tester = new RuleTester({ parserOptions: { ecmaVersion: "2017" } });

const message = "Possible useless comment?";

const valid = [
  "// this is a normal comment",
  "// for a normal comment",
  "// while something",
  "// with more info",
  "// do something",
  "// this is something",
];

const invalids = [
  "// const a = b;",
  "// for (var i = 0; i < a.length; i++) {",
  "// while (a < b.length)",
  "// with(MATH)",
  "// do {",
  "// this.setStatus()",
];

tester.run("no-useless-comment", Rule, {
  valid,
  invalid: invalids.map((code) => {
    return { code, errors: [{ message }] };
  }),
});
