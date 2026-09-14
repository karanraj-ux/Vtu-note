const fs = require('fs');
const content = fs.readFileSync('src/data/moduleDetails.js', 'utf8');
// Evaluate the exported object
const exports = {};
eval(content.replace('export const moduleDetails', 'exports.moduleDetails'));
const data = exports.moduleDetails;
for (const branch in data) {
  for (const sem in data[branch]) {
    data[branch][sem].forEach(subject => {
       console.log(`${branch} sem ${sem} - ${subject.title}: ${subject.modules ? subject.modules.length : 0} modules`);
    });
  }
}
