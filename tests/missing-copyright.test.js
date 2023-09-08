const Rule = require("../plugin/rules/missing-copyright");
const RuleTester = require("eslint").RuleTester;

const tester = new RuleTester({ parserOptions: { ecmaVersion: "2017" } });

tester.run("missing-copyright", Rule, {
    valid: [{
        options: [ "./copyright.txt"],
        code: `
/*
 * This software is owned exclusively by NAME.
 * As such, this software may not be copied, modified, or
 * distributed without express permission from NAME.
 *
 * Copyright (c) 2023
 * All Rights Reserved
*/
 const a = 2;
/*
 * some cool comment
*/`}],
  invalid: [
      {
        options: [ "./copyright.txt"],
          code: 
`const a = 2;`,
          output: 
`/*
* This software is owned exclusively by NAME.
* As such, this software may not be copied, modified, or
* distributed without express permission from NAME.
*
* Copyright (c) 2023
* All Rights Reserved
*/
const a = 2;`,
      errors: [
        {
          message: "This file is missing the copyright.",
        },
      ],
    },
  ],
});
