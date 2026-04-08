const fs = require('fs');
const https = require('https');

https.get('https://grupozakher.com/master-suite-esp', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Extract any zyrosite image URLs
    const urls = data.match(/https:\/\/[^\s"',]+\.(?:jpg|jpeg|png|webp)/gi) || [];
    const uniqueUrls = [...new Set(urls)].filter(url => !url.includes('favicon') && !url.includes('logo'));
    console.log(JSON.stringify(uniqueUrls, null, 2));
    fs.writeFileSync('master_suite_urls.json', JSON.stringify(uniqueUrls, null, 2));
  });
});
