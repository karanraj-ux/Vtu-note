const fs = require('fs');

const file = 'src/data/moduleDetails.js';
let data = fs.readFileSync(file, 'utf8');

// We will do a generic replacement for the BMATS101 and BMATS201 modules
// Currently they just say "Module 1: Notes", etc.
// We can use regex to replace specific ones, or just parse it. It's a JS file with export const moduleDetails = ...
// A simple text replacement is risky if they are identical strings for all subjects.
// Better to parse the object, update it, and write it back? No, it's a JS file with functions or constants.

// Let's use a regex that matches the math-5 block and updates its title
data = data.replace(/id: "math-5",\s*title: "Module 5: Notes",\s*description: "Comprehensive notes for Module 5"/g,
  'id: "math-5",\n            title: "Module 5: Matrix (Linear Algebra)",\n            description: "Comprehensive notes for Module 5: Matrix"');

// And maybe math-3 too, to avoid having two matrices if they are currently both matrix?
// The user just said "module 5 is matrix".
fs.writeFileSync(file, data, 'utf8');
console.log('Updated math-5 title');
