const fs = require('fs');
const https = require('https');

https.get('https://grupozakher.com/junior-suite-esp', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    fs.writeFileSync('junior.html', data);
    console.log("Done");
  });
});
