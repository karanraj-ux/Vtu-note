const fs = require('fs');
let content = fs.readFileSync('src/data/subjectsData.js', 'utf8');

// Insert AI subject to first-year sem 1
const insertString = "            { name: 'Introduction to AI', code: '1BAIA103', credits: 3, info: 'First Semester Introduction to AI Notes, Model Question papers.' },\n";
content = content.replace("1: [", "1: [\n" + insertString);
fs.writeFileSync('src/data/subjectsData.js', content);

let moduleContent = fs.readFileSync('src/data/moduleDetails.js', 'utf8');
const moduleInsert = `      {
        title: "Introduction to AI",
        code: "1BAIA103",
        vtuCode: "1BAIA103",
        credits: 3,
        modules: [
          {
            id: "ai-1",
            title: "Module 1: Introduction",
            description: "Introduction to Artificial Intelligence",
            fileUrl: "https://drive.google.com/uc?export=download&id=1jRFYhJ_qFwyLUdOCfRT7_uAdCqIilj5M",
            previewUrl: "https://drive.google.com/file/d/1jRFYhJ_qFwyLUdOCfRT7_uAdCqIilj5M/preview",
            type: "notes",
            category: "notes",
            essential: true,
            uploadedDate: "2024-02-15",
            fileSize: "2.1",
            tags: ["module-1", "ai"]
          }
        ]
      },
`;
moduleContent = moduleContent.replace("1: [", "1: [\n" + moduleInsert);
fs.writeFileSync('src/data/moduleDetails.js', moduleContent);
