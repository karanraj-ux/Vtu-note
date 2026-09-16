const fs = require('fs');
const file = 'src/data/moduleDetails.js';
let data = fs.readFileSync(file, 'utf8');

// Math 3: 1-IwKiWyX413t3ttm_nLlX1DHeMTIBZsG
// Math 5: 1Mxfj8jZl1T9NlM8Mu-5MHiFEsninrxFV

data = data.replace(/1-IwKiWyX413t3ttm_nLlX1DHeMTIBZsG/g, 'TEMP_MATH_5');
data = data.replace(/1Mxfj8jZl1T9NlM8Mu-5MHiFEsninrxFV/g, '1-IwKiWyX413t3ttm_nLlX1DHeMTIBZsG');
data = data.replace(/TEMP_MATH_5/g, '1Mxfj8jZl1T9NlM8Mu-5MHiFEsninrxFV');

data = data.replace(/id: "math-3",\s*title: "Module 3: Notes",\s*description: "Comprehensive notes for Module 3"/g,
  'id: "math-3",\n            title: "Module 3: Ordinary Differential Equations",\n            description: "Comprehensive notes for Module 3"');

fs.writeFileSync(file, data, 'utf8');
console.log('Swapped math-3 and math-5 URLs');
