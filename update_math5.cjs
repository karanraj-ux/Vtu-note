const fs = require('fs');
const file = 'src/data/moduleDetails.js';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(/id: "math-5",\s*title: "Module 5: Notes",\s*description: "Comprehensive notes for Module 5"/g,
  'id: "math-5",\n            title: "Module 5: Matrix",\n            description: "Matrix, Rank of a matrix, Echelon form, Consistency of system of Linear equations, Gauss Elimination Method"');

fs.writeFileSync(file, data, 'utf8');
console.log('Updated math-5 title');
