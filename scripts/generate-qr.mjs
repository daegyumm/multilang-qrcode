import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
const raw = process.argv[2];
if (!raw) throw new Error('Usage: npm run qr -- https://YOUR-HOST/multilang-qrcode/');
const base = new URL(raw);
if (base.protocol !== 'https:' || base.hash || base.search || base.username || base.password) throw new Error('Use a public HTTPS base URL without credentials, query, or fragment.');
if (!base.pathname.endsWith('/')) base.pathname += '/';
const entries = [ ['entrance', '/'], ['welcome', '/guide/welcome'], ['tasting', '/guide/tasting'] ];
await mkdir('qr-output', { recursive: true });
const manifest = [];
for (const [id, route] of entries) {
  const url = new URL(base); url.hash = route;
  const options = { errorCorrectionLevel: 'M', margin: 4, width: 1024 };
  await QRCode.toFile(`qr-output/${id}.svg`, url.href, { ...options, type: 'svg' });
  await QRCode.toFile(`qr-output/${id}.png`, url.href, options);
  manifest.push({ id, url: url.href });
}
await writeFile('qr-output/manifest.json', JSON.stringify(manifest, null, 2)+'\n');
console.log('Created entrance, welcome and tasting QR files in qr-output/. Verify the live URLs before printing.');
