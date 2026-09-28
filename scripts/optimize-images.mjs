import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import path from 'path'

const ROOT = path.resolve('public')

function maxWidthFor(filePath) {
  const p = filePath.replace(/\\/g, '/').toLowerCase()
  if (p.includes('/search/thumb') || p.includes('books-stack')) return 480
  if (p.includes('featured-') || p.includes('map-illustration')) return 800
  if (p.includes('gallery-') || p.includes('hero-') || p.includes('banner')) return 1400
  if (p.includes('cta-') || p.includes('trust-') || p.includes('grow-')) return 1200
  if (p.endsWith('kiddly-logo.png')) return 512
  return 1600
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (/\.(jpe?g|png)$/i.test(entry.name)) files.push(full)
  }
  return files
}

async function optimize(file) {
  const before = (await stat(file)).size
  const maxW = maxWidthFor(file)
  const pipeline = sharp(file).rotate()
  const meta = await pipeline.metadata()
  const resize =
    meta.width && meta.width > maxW ? pipeline.resize({ width: maxW, withoutEnlargement: true }) : pipeline

  const ext = path.extname(file).toLowerCase()
  if (ext === '.png') {
    await resize.png({ quality: 82, compressionLevel: 9, effort: 10 }).toFile(file + '.tmp')
  } else {
    await resize.jpeg({ quality: 82, mozjpeg: true }).toFile(file + '.tmp')
  }

  const { rename, unlink } = await import('fs/promises')
  await rename(file + '.tmp', file)

  const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp')
  await sharp(file)
    .webp({ quality: 82 })
    .toFile(webpPath)

  const after = (await stat(file)).size
  const webpSize = (await stat(webpPath)).size
  const rel = path.relative(ROOT, file)
  console.log(`${rel}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB, webp ${Math.round(webpSize / 1024)}KB`)
}

const files = await walk(ROOT)
let totalBefore = 0
let totalAfter = 0
for (const file of files) {
  const before = (await stat(file)).size
  totalBefore += before
  await optimize(file)
  totalAfter += (await stat(file)).size
}
console.log(`Done ${files.length} files. JPEG/PNG total: ${Math.round(totalBefore / 1024)}KB → ${Math.round(totalAfter / 1024)}KB`)
