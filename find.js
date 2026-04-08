const fs = require('fs');
const html = fs.readFileSync('layoutesp.html', 'utf8');
const urls = html.match(/assets\.zyrosite\.com\/Yan15JwwoxIyZnZ0\/[a-zA-Z0-9_\-]+\.(?:jpg|jpeg|png|webp)/g);
if (urls) {
  const uniqueUrls = [...new Set(urls)];
  fs.writeFileSync('layout_images.json', JSON.stringify(uniqueUrls, null, 2));
} else {
  console.log("No images found");
}
