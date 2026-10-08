import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const videosTxtPath = path.join(__dirname, '../videos.txt');

console.log('Fetching playlist from YouTube via yt-dlp...');
const cmd = 'yt-dlp --flat-playlist --print "%(id)s | %(title)s" "https://www.youtube.com/playlist?list=PLKmV640wEErw"';
const output = execSync(cmd, { encoding: 'utf8' });

const lines = output
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('Deprecated Feature'));

console.log(`✓ Total valid videos retrieved: ${lines.length}`);
fs.writeFileSync(videosTxtPath, lines.join('\n') + '\n', 'utf8');
console.log(`✓ videos.txt updated successfully at ${videosTxtPath}`);
