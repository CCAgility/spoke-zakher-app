const fs = require('fs');
const https = require('https');

const urls = [
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0450-mePxRbw7WOso9avR.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0464-mp8WRqwR6NIa4Zqj.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0445-YKb3yEDzLnh0WXqo.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0474-YBg7NeODx4iQMX08.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0477-Yg2jRqM809TaD02n.jpeg",
  "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1747-A85VNrR2rJf4PLl9.jpg"
];

urls.forEach((url, i) => {
  const ext = url.endsWith('.jpg') ? '.jpg' : '.jpeg';
  const filename = `public/gallery/casa-estrella/${10 + i}${ext}`;
  const file = fs.createWriteStream(filename);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => console.log(`Downloaded ${filename}`));
    });
  }).on('error', (err) => {
    fs.unlink(filename, () => {});
    console.error(`Error downloading ${url}: ${err.message}`);
  });
});
