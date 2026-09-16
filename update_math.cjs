const fs = require('fs');
const file = 'src/data/moduleDetails.js';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(/id: "math-5",\s*title: "Module 5: Notes",\s*description: "Comprehensive notes for Module 5"/g,
  'id: "math-5",\n            title: "Module 5: Matrix (Linear Algebra)",\n            description: "Comprehensive notes for Module 5: Matrix"');

fs.writeFileSync(file, data, 'utf8');
console.log('Updated math-5 title');
