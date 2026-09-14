const fs = require('fs');

const path = './src/data/moduleDetails.js';
let content = fs.readFileSync(path, 'utf8');

// The original was Principle of Programming Using C (BPOPS103). 
// I replaced it with 1BPOPS103 previously. Now let's change it to 1BEIT105 to match timetable.
content = content.replace(/code: "1BPOPS103"/g, 'code: "1BEIT105"');
content = content.replace(/vtuCode: "1BPOPS103"/g, 'vtuCode: "1BEIT105"');
content = content.replace(/code: "BPOPS103"/g, 'code: "1BEIT105"');
content = content.replace(/vtuCode: "BPOPS103"/g, 'vtuCode: "1BEIT105"');

// And Introduction to Civil Engineering was BESCK104A, we changed it to 1BESC104C in subjectsData
content = content.replace(/code: "BESCK104A"/g, 'code: "1BESC104C"');
content = content.replace(/vtuCode: "BESCK104A"/g, 'vtuCode: "1BESC104C"');
content = content.replace(/code: "1BESCK104A"/g, 'code: "1BESC104C"');
content = content.replace(/vtuCode: "1BESCK104A"/g, 'vtuCode: "1BESC104C"');

fs.writeFileSync(path, content);
console.log("Synced moduleDetails.js!");
