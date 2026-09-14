const fs = require('fs');

const path = './public/vtu_2022_syllabus.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Create a new object with Acharya branches first
const newData = {};
newData['Acharya Physics Cycle'] = data['Acharya Physics Cycle'];
newData['Acharya Chemistry Cycle'] = data['Acharya Chemistry Cycle'];

// Copy the rest
for (const key in data) {
  if (key !== 'Acharya Physics Cycle' && key !== 'Acharya Chemistry Cycle') {
    newData[key] = data[key];
  }
}

fs.writeFileSync(path, JSON.stringify(newData, null, 2));
console.log("Made Acharya branches the default.");
