# AgiletyFrameworkWebApplication

***此项目为AgiletyFramework的前端项目，无法孤立运行***

- 使用*vite*构建。
- 使用*vue3*+*typescript*+*elementplus*。
- 使用Pinia作为状态管理库。
- 集成*echart*，使用*echart*绘制折线图。
- 实现Jwt鉴权，结合localstorage实现token无感刷新
- 实现*动态路由*，*动态渲染*，*表单上传*，*图片上传下载*功能。

删除*node_modules*和*package-lock.json*文件后，打开
*powershell*或其他的shell，定位到项目的根文件夹（包
含*node_modules*的文件夹）,输入以下命令。

`
npm cache verify
`
清除npm缓存。
`
npm install
`
重新安装*node_modules*和*package-lock.json*

确认npm无报错后使用`npm run dev`启动项目
