
// 提升性能用的 cache
// 做成模块是为了给外部提供清除缓存的机会

export let templateParseCache = {}
export let expressionParseCache = {}
export let expressionCompileCache = {}
