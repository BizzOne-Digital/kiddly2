import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const src = path.join(root, 'public', 'kiddly-logo-source.jpg')

/** Turn near-white cream background transparent. */
async function withTransparentBg(input) {
  const { data, info } = await input
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const threshold = 248
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
}

const meta = await sharp(src).metadata()
console.log('Source', meta.width, 'x', meta.height)

const trimmed = await withTransparentBg(sharp(src).rotate())
const trimmedMeta = await trimmed.metadata()

const logoOut = path.join(root, 'public', 'kiddly-logo.png')
await trimmed
  .clone()
  .resize({ width: 320, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(logoOut)

await sharp(logoOut).webp({ quality: 85 }).toFile(path.join(root, 'public', 'kiddly-logo.webp'))

const iconTop = Math.round(trimmedMeta.height * 0.58)
const iconOut = path.join(root, 'public', 'kiddly-icon.png')
await trimmed
  .clone()
  .extract({
    left: Math.round(trimmedMeta.width * 0.08),
    top: Math.round(trimmedMeta.height * 0.02),
    width: Math.round(trimmedMeta.width * 0.84),
    height: iconTop,
  })
  .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(iconOut)

const faviconOut = path.join(root, 'public', 'favicon.png')
await sharp(iconOut).resize(32, 32).png().toFile(faviconOut)

console.log('Wrote kiddly-logo.png, kiddly-icon.png, favicon.png')
