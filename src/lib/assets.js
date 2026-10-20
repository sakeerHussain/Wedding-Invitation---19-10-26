import scenePortrait from '../assets/images/scene-v2.webp'
import scenePortraitLarge from '../assets/images/scene-v2-large.webp'
import sceneDesktop from '../assets/images/scene-desktop.webp'
import envelope from '../assets/images/envelope-v3.webp'
import seal from '../assets/images/seal-v2.webp'
import paper from '../assets/images/embossed-paper.webp'
import cardPortrait from '../assets/images/stationery-layered.webp'
import cardDesktop from '../assets/images/stationery-layered-desktop.webp'
import flowers from '../assets/images/floral-corner-layer.webp'
import petal from '../assets/images/petal-v2.webp?no-inline'

export const assets = { scenePortrait, scenePortraitLarge, sceneDesktop, envelope, seal, paper, cardPortrait, cardDesktop, flowers, petal }
export const sceneSrcSet = `${scenePortrait} 900w, ${scenePortraitLarge} 1440w`
export const sceneSizes = '(min-width: 800px) 800px, 100vw'

const images = new Map()
const fonts = new Map()

function warmImage(src, priority, responsive = false) {
  const key = `${src}:${responsive}`
  const cached = images.get(key)
  if (cached) {
    if (priority === 'high') cached.image.fetchPriority = 'high'
    return cached.ready
  }
  const image = new Image()
  image.decoding = 'async'
  image.fetchPriority = priority
  if (responsive) {
    image.sizes = sceneSizes
    image.srcset = sceneSrcSet
  }
  image.src = src
  const ready = image.decode().catch(() => {})
  images.set(key, { image, ready })
  return ready
}

function warmFont(font) {
  if (!document.fonts) return Promise.resolve()
  if (!fonts.has(font)) fonts.set(font, document.fonts.load(font).catch(() => {}))
  return fonts.get(font)
}

function prepareFonts() {
  return [
    '400 16px "Lora"',
    'italic 400 16px "Lora"',
    '400 16px "Manrope"',
    '400 36px "Great Vibes"',
    '400 36px "Pinyon Script"',
  ].map(warmFont)
}

export function prepareIntroAssets(priority = 'high') {
  const desktop = window.matchMedia('(min-width: 1024px)').matches
  return Promise.allSettled([
    warmImage(desktop ? sceneDesktop : scenePortrait, priority, !desktop),
    warmImage(envelope, priority),
    warmImage(seal, priority),
    warmImage(paper, priority),
    ...prepareFonts(),
  ])
}

export function prepareMainAssets(priority = 'low') {
  const desktop = window.matchMedia('(min-width: 1024px)').matches
  return Promise.allSettled([
    warmImage(desktop ? cardDesktop : cardPortrait, priority),
    warmImage(flowers, priority),
    warmImage(paper, priority),
    warmImage(petal, priority),
    ...prepareFonts(),
  ])
}
