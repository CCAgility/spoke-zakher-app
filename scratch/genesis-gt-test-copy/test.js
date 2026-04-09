const http = require('http');
const { exec } = require('child_process');

console.log("Spinning up mock offline Spoke Container (Returning 500s)...");
const server = http.createServer((req, res) => {
  res.writeHead(500);
  res.end();
});

server.listen(3002, () => {
  console.log("Executing CI/CD Bash Verification Hook...");
  const command = `curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/api/health`;
  
  exec(command, (err, stdout) => {
    console.log(`Cloud Build received HTTP response: ${stdout}`);
    if (stdout !== "200") {
      console.log("[CRITICAL] Infrastructure Validation Failed! CMS Unreachable.");
      console.log("HALTING DEPLOYMENT TO PREVENT LIVE CORRUPTION.");
      server.close();
      process.exit(1);
    } else {
      console.log("SUCCESS. Deploying to Cloud Run.");
      server.close();
      process.exit(0);
    }
  });
});
