const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false//解决 ol is not defined no-undef 关闭了eslintre语法检查
})
