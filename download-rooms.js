const fs = require('fs');
const https = require('https');

const legacy = [
  { url: "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0389-mp8WRqw9M5T49WDb.jpeg", name: "Master Suite" },
  { url: "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0398-m7V3a5Gq50IoWDoN.jpeg", name: "Junior Suite" },
  { url: "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0416-AE0PJaGLJKikzKEo.jpeg", name: "Double Room" },
  { url: "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0430-AVL7R1jyNyFoWb4O.jpeg", name: "Double Room 2" },
  { url: "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0644-m5KM1LpyNxsxzl9b.jpeg", name: "Double Room 3" },
  { url: "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0648-AQExgDanpDUpa2Kz.jpeg", name: "Double Room 4" },
  { url: "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0667-mxB4RMNwkBc51ekz.jpeg", name: "Double Room 5" }
];

legacy.forEach((item) => {
  const filename = `public/gallery/casa-estrella/${item.name.replace(/ /g, '-')}.jpeg`;
  const file = fs.createWriteStream(filename);
  https.get(item.url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => console.log(`Downloaded ${filename}`));
    });
  }).on('error', (err) => {
    fs.unlink(filename, () => {});
    console.error(`Error downloading ${item.url}: ${err.message}`);
  });
});
