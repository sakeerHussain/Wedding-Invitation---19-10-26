import { assets, sceneSizes, sceneSrcSet } from '../lib/assets'

// Share one responsive source selection across intro, interlude and closing.
export default function SceneArt({ loading = 'lazy', fetchPriority = 'auto' }) {
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={assets.sceneDesktop} />
      <img src={assets.scenePortrait} srcSet={sceneSrcSet} sizes={sceneSizes}
        width="900" height="1800" alt="" loading={loading} decoding="async" fetchPriority={fetchPriority} />
    </picture>
  )
}
