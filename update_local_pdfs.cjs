const fs = require('fs');
const file = 'src/data/moduleDetails.js';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(
  /id: "chem-3",([\s\S]*?)fileUrl: "https:\/\/drive.google.com\/uc\?export=download&id=1rWU-U4keAIU5eNUs9Ivmjiaa3zNRH_tP",\s*previewUrl: "https:\/\/drive.google.com\/file\/d\/1rWU-U4keAIU5eNUs9Ivmjiaa3zNRH_tP\/preview"/g,
  'id: "chem-3",$1fileUrl: "/notes/1BCHES102_Module_3.pdf",\n            previewUrl: "/notes/1BCHES102_Module_3.pdf"'
);

fs.writeFileSync(file, data, 'utf8');
console.log('Updated to chem-3 local PDF');
