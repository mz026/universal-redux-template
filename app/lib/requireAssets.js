export default (assetPath)=> {
  if (process.env.NODE_ENV === 'production' && process.env.ON_SERVER) {
    var path = require('path')
    var refManifest = require(path.join(__dirname, '../../dist/rev-manifest.json'))

    if (assetPath[0] === '/') {
      assetPath = assetPath.substr(1, assetPath.length)
    }
    return `/${refManifest[assetPath]}`
  } else {
    return assetPath
  }
}
