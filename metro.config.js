const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('@/')) {
    const newPath = path.join(__dirname, moduleName.slice(2))
    return context.resolveRequest(context, newPath, platform)
  }
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
