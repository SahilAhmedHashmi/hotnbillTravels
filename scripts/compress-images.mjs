// One-off image optimizer for public assets.
// - Destination photos: downscale to <=1600px wide, re-encode as mozjpeg q80.
//   PNG photos are converted to .jpg (opaque landscapes, no transparency needed).
// - Logo: downscale to <=512px, q86 (kept as logo.jpeg).
// Run: node scripts/compress-images.mjs
import sharp from 'sharp';
import { readdir, readFile, unlink, stat } from 'node:fs/promises';
import path from 'node:path';

const kb = (n) => Math.round(n / 1024);

async function compressDir(dir, { maxWidth, quality, toJpg }) {
  const files = await readdir(dir);
  let before = 0;
  let after = 0;
  const converted = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const inPath = path.join(dir, file);
    const srcSize = (await stat(inPath)).size;
    const buf = await readFile(inPath); // read first so we can safely overwrite in place

    const outName = toJpg ? `${path.basename(file, ext)}.jpg` : file;
    const outPath = path.join(dir, outName);

    await sharp(buf)
      .rotate() // honor EXIF orientation before stripping metadata
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toFile(outPath);

    const outSize = (await stat(outPath)).size;
    before += srcSize;
    after += outSize;

    if (inPath !== outPath) {
      await unlink(inPath); // drop the original .png / .jpeg
      converted.push(`${file} -> ${outName}`);
    }
    console.log(`  ${file.padEnd(34)} ${String(kb(srcSize)).padStart(6)} KB -> ${String(kb(outSize)).padStart(5)} KB`);
  }

  console.log(`  -----\n  ${dir}: ${kb(before)} KB -> ${kb(after)} KB\n`);
  if (converted.length) console.log('  Converted:', converted.join(', '), '\n');
}

async function compressFile(filePath, { maxWidth, quality }) {
  const srcSize = (await stat(filePath)).size;
  const buf = await readFile(filePath);
  await sharp(buf)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(filePath);
  const outSize = (await stat(filePath)).size;
  console.log(`  ${path.basename(filePath).padEnd(20)} ${kb(srcSize)} KB -> ${kb(outSize)} KB\n`);
}

console.log('Destination photos:');
await compressDir('public/destinations', { maxWidth: 1600, quality: 80, toJpg: true });

console.log('Logo:');
await compressFile('public/logo.jpeg', { maxWidth: 512, quality: 88 });
