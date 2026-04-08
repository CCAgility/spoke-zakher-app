const fs = require('fs');
const https = require('https');

const rooms = {
  'junior-suite': [
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0516-m7V3a5PVazHyrjWe.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0512-dJoZ95zqDPUQe37o.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0507-YleWRqoeR7FVgR6x.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1669-AGBb9vDKQ4c0Z7ZQ.jpg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1681-AzGN9DJKxPhWwo9V.jpg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1675-m5Knyr505xTPpZlM.jpg'
  ],
  'double-room': [
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0497-Yan1Rqoj2asjwXV0.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1705-mk3Jj5bnN5h1PKrp.jpg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1711-YrDJ2XKDz5UEl4Kq.jpg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1708-YKblpNRwwDcePlnJ.jpg'
  ],
  'double-room-2': [
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0569-YbNBRqk30lIg566q.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0574-YleWRqoE75tpKrap.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0576-YD0lWBLzgPSqDQWL.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0606-Yan1RqoaGGtNnV9O.jpeg'
  ],
  'double-room-3': [
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0590-mk3vRqo34KUeKqDm.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0597-YX4lRao8W3iqa9Bx.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1849-mePJBVrOwNHqEaxR.jpg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/1l1a1846-A3Q7NkMo1Nhbe6wa.jpg'
  ],
  'double-room-4': [
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0497-Yan1Rqoj2asjwXV0.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0545-YD0lWBLzR1fZaq06.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0544-AGB2wnENgQIwo72K.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0557-A1aPMBWl6MfPLkJ1.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0563-AGB2wnEjMZHp458N.jpeg'
  ],
  'double-room-5': [
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0611-Aq2WRqPnZ1Sg9l1O.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0617-Aq2WRqPl19sqMLDe.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0622-A1aPMBWjJLIlvDyx.jpeg',
    'https://assets.zyrosite.com/Yan15JwwoxIyZnZ0/_mg_0563-AGB2wnEjMZHp458N.jpeg'
  ]
};

async function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(resolve); });
    }).on('error', (e) => {
      fs.unlink(destPath, () => {});
      reject(e);
    });
  });
}

async function run() {
  const newUrls = [];
  const devNotesPath = 'dev-notes.json';
  const devNotesStr = fs.readFileSync(devNotesPath, 'utf8');
  let devNotes = JSON.parse(devNotesStr);

  for (const [roomSlug, urls] of Object.entries(rooms)) {
    console.log(`Starting ${roomSlug}...`);
    for (let i = 0; i < urls.length; i++) {
      let url = urls[i];
      // Note the URLs from browser subagent include /cdn-cgi/image/format=auto,w=1440,h=1179,fit=crop/
      // Need to clean it to get raw image
      url = url.replace(/cdn-cgi\/image\/[^/]+\//, '');

      const ext = url.endsWith('.jpg') ? '.jpg' : '.jpeg';
      const filename = `casa-estrella-${roomSlug}-${i+1}${ext}`;
      const destPath = `public/gallery/casa-estrella/${filename}`;
      
      await downloadImage(url, destPath);
      const localUrl = `/gallery/casa-estrella/${filename}`;
      newUrls.push(localUrl);
      
      const humanRoomName = roomSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      devNotes[localUrl] = `No Geo Tag required - Just follow naming convention. (${humanRoomName} photo ${i+1})`;
      console.log(`Downloaded ${filename}`);
    }
  }

  // Also rename Master Suite existing downloaded photos (10-15)
  // 10.jpeg, 11.jpeg, 12.jpeg, 13.jpeg, 14.jpeg, 15.jpg
  // Let's manually do it in this script.
  const masterMap = {
    "10.jpeg": "casa-estrella-master-suite-1.jpeg",
    "11.jpeg": "casa-estrella-master-suite-2.jpeg",
    "12.jpeg": "casa-estrella-master-suite-3.jpeg",
    "13.jpeg": "casa-estrella-master-suite-4.jpeg",
    "14.jpeg": "casa-estrella-master-suite-5.jpeg",
    "15.jpg": "casa-estrella-master-suite-6.jpg"
  }
  for (const [oldName, newName] of Object.entries(masterMap)) {
    if (fs.existsSync(`public/gallery/casa-estrella/${oldName}`)) {
        fs.renameSync(`public/gallery/casa-estrella/${oldName}`, `public/gallery/casa-estrella/${newName}`);
        const oldUrl = `/gallery/casa-estrella/${oldName}`;
        const newUrl = `/gallery/casa-estrella/${newName}`;
        devNotes[newUrl] = devNotes[oldUrl] || `No Geo Tag required - Just follow naming convention. (Master Suite)`;
        delete devNotes[oldUrl];
    }
  }

  // Now the interior photos that are in 1-9.webp.
  // 2.webp: living room
  // 3.webp: living room 2
  // 4.webp: dining room 
  // 7.webp: bedroom
  // 8.webp: kitchen
  const originalMap = {
    "2.webp": "casa-estrella-living-room.webp",
    "3.webp": "casa-estrella-living-room-2.webp",
    "4.webp": "casa-estrella-dining-room.webp",
    "7.webp": "casa-estrella-bedroom.webp",
    "8.webp": "casa-estrella-kitchen.webp"
  }
  for (const [oldName, newName] of Object.entries(originalMap)) {
    if (fs.existsSync(`public/gallery/casa-estrella/${oldName}`)) {
        fs.renameSync(`public/gallery/casa-estrella/${oldName}`, `public/gallery/casa-estrella/${newName}`);
        const oldUrl = `/gallery/casa-estrella/${oldName}`;
        const newUrl = `/gallery/casa-estrella/${newName}`;
        devNotes[newUrl] = devNotes[oldUrl];
        delete devNotes[oldUrl];
    }
  }

  fs.writeFileSync('dev-notes.json', JSON.stringify(devNotes, null, 2));
  fs.writeFileSync('new_urls.json', JSON.stringify(newUrls, null, 2));
  console.log('Done.');
}
run().catch(console.error);
