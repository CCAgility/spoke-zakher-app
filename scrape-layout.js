const fs = require('fs');
const html = fs.readFileSync('layoutesp.html', 'utf8');

const regex = /<h6>(.*?)<\/h6>[\s\S]*?<picture.*?<img.*?src="(.*?)"/gi;
let match;
const results = [];
while ((match = regex.exec(html)) !== null) {
  results.push({ title: match[1], url: match[2] });
}

console.log(JSON.stringify(results, null, 2));

// fallback regex if picture isn't used
if (results.length === 0) {
  const jsonRegex = /"text":"<h6>(.*?)<\/h6>"/gi;
  let jMatch;
  while ((jMatch = jsonRegex.exec(html)) !== null) {
    console.log(jMatch[1]);
  }
}
