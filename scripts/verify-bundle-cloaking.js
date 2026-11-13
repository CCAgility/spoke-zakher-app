#!/usr/bin/env node
/**
 * Agility Platform Security Charter (SC-03): Fail-Closed Post-Build Bundle Cloaking & PII/IP Scanner
 * Template SSoT: agility-multi-tenant-ai-services/dna/governance/verify-bundle-cloaking.template.js
 *
 * Usage:
 *   node scripts/verify-bundle-cloaking.js [outDir]
 *   (Defaults to ./out or ./dist or ./.next/static)
 */

const fs = require('fs');
const path = require('path');

const CANDIDATE_DIRS = [
  process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : null,
  path.resolve(process.cwd(), 'out'),
  path.resolve(process.cwd(), 'dist'),
  path.resolve(process.cwd(), '.next', 'static'),
].filter(Boolean);

const OUT_DIR = CANDIDATE_DIRS.find((d) => fs.existsSync(d));

function loadPublicClientKeys() {
  const keys = [];
  const candidates = [
    path.resolve(process.cwd(), 'src', 'lib', 'firebase.ts'),
    path.resolve(process.cwd(), 'src', 'lib', 'firebase.js'),
    path.resolve(process.cwd(), 'lib', 'firebase.ts'),
  ];
  for (const cfg of candidates) {
    try {
      if (!fs.existsSync(cfg)) continue;
      const src = fs.readFileSync(cfg, 'utf8');
      const m = src.match(/apiKey:\s*["'](AIza[0-9A-Za-z_-]{35})["']/);
      if (m) keys.push(m[1]);
    } catch (_) {}
  }
  const PUBLIC_ENV_NAMES = new Set([
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'VITE_FIREBASE_API_KEY',
    'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
  ]);
  for (const envFile of ['.env', '.env.local', '.env.production']) {
    try {
      const p = path.resolve(process.cwd(), envFile);
      if (!fs.existsSync(p)) continue;
      for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*["']?(AIza[0-9A-Za-z_-]{35})["']?/);
        if (m && PUBLIC_ENV_NAMES.has(m[1])) keys.push(m[2]);
      }
    } catch (_) {}
  }
  return Array.from(new Set(keys));
}

const ALLOWLIST = loadPublicClientKeys();

const FORBIDDEN_PATTERNS = [
  {
    label: 'Plaintext Personal/Internal Email Address',
    regex: /[A-Za-z0-9._%+-]+@(gmail|icloud|yahoo|outlook|hotmail|agility-systems)\.com/gi,
  },
  {
    label: 'Unallowlisted Google API Key (AIza*)',
    regex: /AIza[0-9A-Za-z_-]{35}/g,
  },
  {
    label: 'PEM Key Material Block',
    regex: new RegExp('-----BEGIN [A-Z ]*' + 'PRIVATE' + ' KEY-----', 'g'),
  },
  {
    label: 'GCP Service Account JSON Credential',
    regex: /"type"\s*:\s*"service_account"/g,
  },
  {
    label: 'Client-Exposed Secret Env Identifier',
    regex: /NEXT_PUBLIC_[A-Z0-9_]*(SECRET|PRIVATE|API_KEY|TOKEN)/g,
  },
  {
    label: 'Upstream Source Map Reference',
    regex: /\/\/# sourceMappingURL=/g,
  },
];

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function main() {
  if (!OUT_DIR) {
    console.error('[verify-bundle-cloaking] FAIL: No build output directory found (checked out/, dist/, .next/static/).');
    process.exit(1);
  }

  const allFiles = walk(OUT_DIR);
  const mapFiles = allFiles.filter((f) => f.endsWith('.map'));
  const violations = [];

  if (mapFiles.length > 0) {
    violations.push(`Found ${mapFiles.length} .map source map file(s) in ${OUT_DIR}`);
  }

  const scannableExts = new Set(['.js', '.mjs', '.cjs', '.html', '.json', '.txt', '.css']);
  const scanned = allFiles.filter((f) => scannableExts.has(path.extname(f).toLowerCase()));

  for (const filePath of scanned) {
    const content = fs.readFileSync(filePath, 'utf8');
    for (const rule of FORBIDDEN_PATTERNS) {
      rule.regex.lastIndex = 0;
      let match;
      while ((match = rule.regex.exec(content)) !== null) {
        if (ALLOWLIST.includes(match[0])) continue;
        violations.push(`${rule.label} in ${path.relative(OUT_DIR, filePath)}`);
        break;
      }
    }
  }

  if (violations.length > 0) {
    console.error(`[verify-bundle-cloaking] FAIL (${violations.length} violation(s)):`);
    for (const v of violations.slice(0, 20)) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log(`[verify-bundle-cloaking] PASSED! Scanned ${scanned.length} bundle files in ${path.relative(process.cwd(), OUT_DIR) || OUT_DIR} (0 .map files, 0 forbidden patterns).`);
}

main();

