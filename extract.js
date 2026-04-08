const fs = require('fs');
const html = fs.readFileSync('layoutesp.html', 'utf8');

// Match base URLs like https://assets.zyrosite.com/... without srcset params
let imgUrls = [...html.matchAll(/https:\/\/assets\.zyrosite\.com\/Yan15JwwoxIyZnZ0\/[^\s"',\?]+\.(?:jpg|jpeg|png|webp)/gi)]
  .map(m => m[0])
  .filter(url => !url.includes('favicon') && !url.includes('logo') && !url.includes('cdn-cgi'));

imgUrls = [...new Set(imgUrls)];

console.log(JSON.stringify(imgUrls, null, 2));
