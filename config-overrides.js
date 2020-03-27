const {override,fixBabelImport,addLessLoader} = require('customize-cra')

module.exports = override(
    fixBabelImport('import',{ //配置上babel-plugin-import
        libraryName:'antd',  //针对的是antd
        libraryDirectory:'es',//源码文件夹中的es文件夹
        style:'css',  //自动打包相关的css
    }),
    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{'@primary-color':'#1DA57A'},// 定义primary-color的颜色从蓝色变成绿色
    }),
);