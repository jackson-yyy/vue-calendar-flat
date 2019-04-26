const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    css: {
        extract: false
    },
    // 修改 src 目录 为 examples 目录
    pages: {
        index: {
            entry: 'examples/main.ts',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    devServer: {
        disableHostCheck: true,
        port: 8081
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('packages'))
    }
}