module.exports = {
  devServer: {
    port:9010,
    host: '0.0.0.0', // 本地和局域网
    // host: 'localhost', // 只有本地
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    /*proxy: {
      '/app': {
        // target: 'http://10.5.181.185:9090',
        target: 'http://10.5.181.184:9999',
        // target: 'https://10.5.181.185:443',
        ws: true,
        pathRewrite: {
          '^/app': '/app'
        }
      }
    }*/
    // 1) 代理 proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    /* proxy: {
            '/': {
                target: 'http://10.5.181.184:9999/', // API服务器的地址
                // target: 'http://170.111.13.167:9091', // 李泽旭
                // ws: true,  //代理 websockets
                secure:false,
                changeOrigin: false, // 虚拟的站点需要更管origin
                /!*pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '/api': ''
                }*!/
            },
        },*/
      // before(app){ // 提供的方法 钩子
      //   console.log("app:",app)
      //   app.get('/index',(req,res)=>{
      //     // res.json({name:'before'})
      //   })
      // }

  },
    pages: {
        app: {
            // 入口文件，相对于多页面应用的main.js，必需。
            entry: 'src/main.js',
            // 应用的模板，相当于单页面应用的public/index.html，非必须，省略时默认与模块名一致。
            template: 'public/index.html',
            // o 编译后 dist目录中输出的文件名，非必须，省略时默认与模块名一致。
            filename: 'index.html'
            // chunks: ['src1']
        }
        /* ---------------开启多页面应用-------------------- */
        /* src2: {
                // 入口文件，相对于多页面应用的main.js，必需。
                entry: 'src1/main.js',
                // 应用的模板，相当于单页面应用的public/index.html，非必须，省略时默认与模块名一致。
                template: 'public/index1.html',
                //o 编译后 dist目录中输出的文件名，非必须，省略时默认与模块名一致。
                filename: 'index1.html',
                // 当使用 title 选项时，
                // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
                title: 'src1',
                // 在这个页面中包含的块，默认情况下会包含
                // 提取出来的通用 chunk 和 vendor chunk。
                // chunks: ['chunk-vendors', 'chunk-common', 'index']
            }, */
        // 只有entry属性时，直接用字符串表示模块入口，其他默认与模块名一致
    },
    productionSourceMap:false,
  // lintOnSave:false, // 取消eslint验证
}