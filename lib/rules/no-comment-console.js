module.exports={meta:{type:"suggestion",docs:{description:"Code that should be removed before pushing to repo.",category:"Best Practices",recommended:!1},fixable:"code",messages:{value:"Did you just leave a commented 'console.log'?"}},create:a=>{/**
     * Gets a fixer function to remove a given 'console.' directive.
     * @param {ASTNode} node The directive that should be removed
     * @returns {Function} A fixer function
     */function b(a){return b=>b.remove(a)}return{Program(c){c.comments.filter(a=>"Line"===a.type).forEach(d=>{return /^\s?console.*/.test(d.value)?a.report({node:c,messageId:"value",loc:d.loc,fix:b(d)}):null})}}}};