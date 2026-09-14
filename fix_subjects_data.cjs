const fs = require('fs');
const path = './src/data/subjectsData.js';
let content = fs.readFileSync(path, 'utf8');

// first-year sem 1
content = content.replace(/code: 'BMATS101'/g, "code: '1BMATS101'");
content = content.replace(/code: 'BPHYS102\/202'/g, "code: '1BPHYS102'");
content = content.replace(/code: 'BPOP103\/203'/g, "code: '1BEIT105'"); // Programming in C in timetable is 1BEIT105, wait.
content = content.replace(/code: 'BENGK106'/g, "code: '1BENG106'");
content = content.replace(/code: 'BICOK107'/g, "code: '1BICO107'");
content = content.replace(/code: 'BSFHK158'/g, "code: '1BSFHK158'");
content = content.replace(/code: 'BESCK104A'/g, "code: '1BESC104C'"); // Timetable says Intro to Electronics & Comm is 1BESC104C

fs.writeFileSync(path, content);
console.log("Updated subjectsData.js");
