const path = require('path');
const fs = require('fs');
const join = path.join;
function resolve(dir) {
    return path.resolve(__dirname, dir)
}
//配置多文件打包 按需引入
function getEntries(path) {
    let files = fs.readdirSync(resolve(path));
    const entries = files.reduce((ret, item) => {
        const itemPath = join(path, item)
        const isDir = fs.statSync(itemPath).isDirectory();
        if (isDir) {
            ret[item] = resolve(join(itemPath, 'index.js'))
        } else {
            const [name] = item.split('.')
            ret[name] = resolve(`${itemPath}`)
        }
        return ret
    }, {})
    return entries
}

module.exports = {
  lintOnSave: false,
//   publicPath:'/static/',
//   assetsDir:'static',
  pages:{
      index:{
        entry:'examples/main.js',
        template:'public/index.html',
        filename:'index.html'
      }
  },
//   css: { extract: false },
  configureWebpack: {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('packages'),
            'assets': resolve('examples/assets'),
            'views': resolve('examples/views'),
        }
    }, 
    //vue-cli-service build --mode production --name yuwen-ui --target lib --dest lib packages/index.js --target lib 不用多文件 全局引入，再把entry注释掉
    // entry:process.env.NODE_ENV === 'development' ? {} : {
    //     ...getEntries('packages'),
    // },
    // output: {
    //     filename: '[name]/index.js',
    //     libraryTarget: 'umd',
    // },
},
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
        .add('/packages')
        .end()
      .use('babel')
        .loader('babel-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
        config.optimization.delete('splitChunks')
        config.plugins.delete('copy')
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.plugins.delete('hmr')
        config.entryPoints.delete('app')
        // config.module
        //     .rule('fonts')
        //     .use('url-loader')
        //     .tap(option => {
        //         option.fallback.options.name = 'fonts/[name].[hash:8].[ext]'
        //         return option
        //     })
  }
};
