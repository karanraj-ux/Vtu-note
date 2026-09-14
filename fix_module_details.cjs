const fs = require('fs');

const path = './src/data/moduleDetails.js';
let content = fs.readFileSync(path, 'utf8');

// Replace BMATS101 -> 1BMATS101 in first year
content = content.replace(/code: "BMATS101"/g, 'code: "1BMATS101"');
content = content.replace(/vtuCode: "BMATS101"/g, 'vtuCode: "1BMATS101"');

// Replace BPHYS102 -> 1BPHYS102
content = content.replace(/code: "BPHYS102"/g, 'code: "1BPHYS102"');
content = content.replace(/vtuCode: "BPHYS102"/g, 'vtuCode: "1BPHYS102"');

// Replace BPOPS103 -> 1BPOPL107 or similar, wait it's just principles of programming
content = content.replace(/code: "BPOPS103"/g, 'code: "1BPOPS103"');
content = content.replace(/vtuCode: "BPOPS103"/g, 'vtuCode: "1BPOPS103"');

// Replace BENGK106 -> 1BENG106
content = content.replace(/code: "BENGK106"/g, 'code: "1BENG106"');
content = content.replace(/vtuCode: "BENGK106"/g, 'vtuCode: "1BENG106"');

// Replace BICOK107 -> 1BICO107
content = content.replace(/code: "BICOK107"/g, 'code: "1BICO107"');
content = content.replace(/vtuCode: "BICOK107"/g, 'vtuCode: "1BICO107"');

// Replace BSFHK158 -> 1BSFHK158
content = content.replace(/code: "BSFHK158"/g, 'code: "1BSFHK158"');
content = content.replace(/vtuCode: "BSFHK158"/g, 'vtuCode: "1BSFHK158"');

fs.writeFileSync(path, content);
console.log("Updated moduleDetails.js codes!");
