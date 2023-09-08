const reservedWords=["abstract","arguments","await","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends",// This is one that will give a lot of false positives
// 'false',
"final","finally","float","for","function","goto","if","implements","import",// This is one that will give a lot of false positives
// 'in',
"instanceof","int","interface","let","long","native",// This is one that will give a lot of false positives
// 'new',
"null","package",// This is one that will give a lot of false positives
// 'private',
"protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient",// This is one that will give a lot of false positives
// 'true',
"try","typeof","var","void","volatile","while","with","yield"];module.exports={meta:{type:"suggestion",docs:{description:"Code that should be removed before pushing to repo.",category:"Best Practices",recommended:!1},messages:{useless:"Possible useless comment?"}},create:a=>{function b(a){return"for"===a||"until"===a||"while"===a||"with"===a?RegExp(`^\\s*${a}\\s?\\(`):"do"===a?RegExp(`^\\s*${a}\\s?\\{`):"this"===a?RegExp(`^\\s*${a}\\.`):RegExp(`^\\s*${a}\\s`)}return{Program(c){c.comments.filter(a=>"Line"===a.type).forEach(d=>(reservedWords.forEach(e=>{const f=b(e);if(f.test(d.value))return a.report({node:c,loc:d.loc,messageId:"useless"})}),null))}}}};