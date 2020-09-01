使用到vue项目的文件包括一个.html，两个.js，两个.vue文件，关系如上图所示
由图可见，文件关键处在于main.js，管理着所有需要的资源，其中new Vue的参数，解释如下：
el：官方解释为实例提供挂载的元素。此处为index.html中的<div id="app"><div>。
router：为router:router,的简写，指向引入文件中的routes:[]
components：注册哪些组件，需在顶部引入文件。
template：替换挂载元素的模板组件，而挂载元素的内容都将被忽略。即用template替换index.html里面的<div id="app"></div>
此时，可知main.js文件调用关系分为三步，如图中序号
确定将被挂载（替换）的元素，此处为index.html中的<div id="app"><div>。
注册组件（此处只有组件App），选择其中用于替换挂载元素（第一步中的元素）的模板组件（<App/>），即用App.vue替换index.html中的<div id="app"><div>。
注入路由器router：
模板组件（App.vue）中有<router-view/>，将在其中渲染路由匹配到的组件
注入（import）路由时指定的是router文件夹，即文件夹下所有routes
router文件夹下此时只有index.js文件，其中routes:[]规定了文件地址及其url地址映射
根据文件地址，载入组件（First.vue），组件被渲染在<router-view/>中，显示在index.html中
然而追本溯源，调用关系中仍有两个问题：
index.html为何默认显示？
其实，双击执行npm中dev时，控制台将执行如下语句：
webpack-dev-server --inline --progress --config build/webpack.dev.conf.js

由此可见，运行时启动文件webpack.dev.conf.js，而文件中包含如下语句，规定了起始页面：

	new HtmlWebpackPlugin({
	      filename: 'index.html',
	      template: 'index.html',
	      inject: true
	    }),

main.js为何默认加载？
因为使用的脚手架工具vue-cli里用webpack来打包项目文件，webpack.dev.conf文件里还定义了webpack基础配置文件webpack.base.conf.js，定义语句如下：
const baseWebpackConfig = require('./webpack.base.conf')
而文件webpack.base.conf.js中，包含如下语句，指定了入口：
 entry: {
    app: './src/main.js'
  }

至此，文件调用关系简述完毕