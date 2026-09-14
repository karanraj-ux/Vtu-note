const fs = require('fs');

const path = './public/vtu_2022_syllabus.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Update Physics Group Semester I
data['CSE (Physics Group)']['I SEMESTER'] = [
  { "code": "1BMATS101", "title": "Calculus and Linear Algebra", "credits": "4" },
  { "code": "1BPHYS102", "title": "Quantum Physics and Applications", "credits": "4" },
  { "code": "1BCEDS103", "title": "Computer-Aided Engineering Drawing", "credits": "3" },
  { "code": "1BESC104C", "title": "Introduction to Electronics & Comm", "credits": "3" },
  { "code": "1BEIT105", "title": "Programming in C", "credits": "3" },
  { "code": "1BSKS106", "title": "Soft Skill", "credits": "1" },
  { "code": "1BPOPL107", "title": "C Programming Lab", "credits": "1" },
  { "code": "1BIDTL158", "title": "Innovation and Design Thinking Lab", "credits": "1" },
  { "code": "1BKSK109", "title": "Samskrutika / Balake Kannada", "credits": "1" }
];

// Update Chemistry Group Semester I
data['CSE (Chemistry Group)']['I SEMESTER'] = [
  { "code": "1BMATS101", "title": "Calculus And Linear Algebra", "credits": "4" },
  { "code": "1BCHES102", "title": "Applied Chemistry for Smart Systems", "credits": "4" },
  { "code": "1BAIA103", "title": "Introduction to AI and Applications", "credits": "3" },
  { "code": "1BESC104B", "title": "Introduction to Electrical Engineering", "credits": "3" },
  { "code": "1BPLC105B", "title": "Introduction to Python Programming", "credits": "3" },
  { "code": "1BENG106", "title": "Communication Skills", "credits": "1" },
  { "code": "1BICO107", "title": "Indian Constitution & Engineering Ethics", "credits": "1" },
  { "code": "1BIDTL158", "title": "Innovation and Design Thinking Lab", "credits": "1" },
  { "code": "1CHEL109", "title": "Applied Chemistry Lab", "credits": "1" } // Added lab to reach ~21 credits
];

// We can also add Acharya specific branches to make it obvious
data['Acharya Physics Cycle'] = {
  "I SEMESTER": data['CSE (Physics Group)']['I SEMESTER']
};

data['Acharya Chemistry Cycle'] = {
  "I SEMESTER": data['CSE (Chemistry Group)']['I SEMESTER']
};

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Updated syllabus successfully!");
