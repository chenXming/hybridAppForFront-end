
const path = require('path');

module.exports = {
    // 这个文件是新建的，便于在vue 里面修改webpack的配置
    configureWebpack: config => {
        if(process.env.NODE_ENV === 'production') {
            //为生产化解修改配置


        }else {
            // // 为开发环境修改配置,只会在开发环境中生效，当使用 npm run build 打包时候，这些配置不会生效
            // return {
            //     resolve: {
            //         alias: { // 别名，用别名来代替相对路径 __dirname : 表示相对于整个项目文件的根目录，可以使用@js来代替后面的相对路径
            //            '@js':path.resolve(__dirname,'./src/assets/js'),
            //            '@css':path.resolve(__dirname,'./src/assets/css'),
            //            '@img':path.resolve(__dirname,'./src/assets/imgs'),
            //            '@c':path.resolve(__dirname,'./src/components'),
            //         }
            //     }
            // }
        }
        return {
            resolve: {
                alias: { // 别名，用别名来代替相对路径 __dirname : 表示相对于整个项目文件的根目录，可以使用@js来代替后面的相对路径
                   '@js':path.resolve(__dirname,'./src/assets/js'),
                   '@css':path.resolve(__dirname,'./src/assets/css'),
                   '@img':path.resolve(__dirname,'./src/assets/imgs'),
                   '@c':path.resolve(__dirname,'./src/components'),
                }
            }
        }
    }
  }