var merge = require('webpack-merge')
var env = require('./.env')

module.exports = merge(env, {
  NODE_ENV: '"production"'
})
