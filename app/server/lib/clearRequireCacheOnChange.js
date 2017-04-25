import { watch } from 'chokidar'

export default ({ rootDir })=> {
  watch(rootDir, { ignored: /test/, ignoreInitial: true }).on('all', (event, path)=> {
    Object.keys(require.cache).forEach(function(cachedFile) {
      if (belongsToApp(cachedFile, rootDir)) {
        delete require.cache[cachedFile]
      }
    })
    console.log("clear server requiring cache")
  })
}

function belongsToApp (filePath, rootDir) {
  if (filePath.includes('node_modules')) {
    return false
  }
  return filePath.includes(rootDir)
}
