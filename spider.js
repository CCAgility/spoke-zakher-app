const fs = require('fs');
const https = require('https');

async function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve(data));
      res.on('error', e => reject(e));
    }).on('error', e => reject(e));
  });
}

function extractUniqueImages(html) {
  const regex = /https:\/\/assets\.zyrosite\.com\/[a-zA-Z0-9_\-\/]+\.(?:jpg|jpeg|png|webp)/gi;
  const urls = html.match(regex) || [];
  return [...new Set(urls)].filter(u => !u.includes('favicon') && !u.includes('logo') && !u.includes('cdn-cgi'));
}

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Fetching layoutesp...');
  const layout = await get('https://grupozakher.com/layoutesp');
  
  // Extract room paths
  const linkRegex = /href="(\/[^"]+-esp)"/gi;
  let match;
  const roomPaths = new Set();
  while ((match = linkRegex.exec(layout)) !== null) {
      roomPaths.add(match[1]);
  }
  
  const existingMasterSuite = [
    "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0450-mePxRbw7WOso9avR.jpeg",
    "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0464-mp8WRqwR6NIa4Zqj.jpeg",
    "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0445-YKb3yEDzLnh0WXqo.jpeg",
    "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0474-YBg7NeODx4iQMX08.jpeg",
    "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0477-Yg2jRqM809TaD02n.jpeg",
    "https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1747-A85VNrR2rJf4PLl9.jpg"
  ];
  
  let counter = 16;
  const newUrls = [];
  const devNotes = JSON.parse(fs.readFileSync('dev-notes.json', 'utf8'));

  for (const path of roomPaths) {
    if (path.includes('master-suite')) continue; 
    
    console.log(`Fetching ${path}...`);
    const roomName = path.replace('/', '').replace('-esp', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const html = await get(`https://grupozakher.com${path}`);
    const images = extractUniqueImages(html);
    
    for (const imgUrl of images) {
      if (existingMasterSuite.includes(imgUrl)) continue; // skip already downloaded
      
      const ext = imgUrl.endsWith('.jpg') ? '.jpg' : '.jpeg';
      const destName = `${counter}${ext}`;
      const destPath = `public/gallery/casa-estrella/${destName}`;
      
      console.log(`Downloading ${imgUrl} -> ${destName}`);
      await downloadImage(imgUrl, destPath);
      
      const localUrl = `/gallery/casa-estrella/${destName}`;
      newUrls.push(localUrl);
      
      // Add dev notes for interior
      devNotes[localUrl] = `No Geo Tag required - Just follow naming convention. (${roomName})`;
      
      counter++;
    }
  }

  // Update dev-notes.json
  fs.writeFileSync('dev-notes.json', JSON.stringify(devNotes, null, 2));

  // Output new local urls array to append to PhotosAdmin
  fs.writeFileSync('new_urls.json', JSON.stringify(newUrls, null, 2));
  console.log(`Downloaded ${counter - 16} images successfully.`);
}

main().catch(console.error);
