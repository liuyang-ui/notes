// //前端模块化(CommonJs,AMD,CMD)
// // AMD:提前执行（异步加载：依赖先执行）+延迟执行
// // CMD:延迟执行（运行到需加载，根据顺序执行）
// //  CommonJs
// math.js
// exports.add = function() {
//     var sum = 0, i = 0, args = arguments, l = args.length;
//     while (i < l) {
//       sum += args[i++];
//     }
//     return sum;
// };

// increment.js
// var add = require('math').add;
// exports.increment = function(val) {
//     return add(val, 1);
// };

// index.js
// var increment = require('increment').increment;
// var a = increment(1); //2
// // CommonJs加载模块使用require方法，改方法读取一个文件并执行，返回文件内部第二module.exports对象
// //仔细看上面的代码，您会注意到 require 是同步的。模块系统需要同步读取模块文件内容，并编译执行以得到模块接口。
// //浏览器端，加载 JavaScript 最佳、最容易的方式是在 document 中插入<script>标签。但脚本标签天生异步，传统 CommonJS 模块在浏览器环境中无法正常加载。
// math.js
// define(function(require, exports, module) {
//   exports.add = function() {
//     var sum = 0, i = 0, args = arguments, l = args.length;
//     while (i < l) {
//       sum += args[i++];
//     }
//     return sum;
//   };
// });

// increment.js
// define(function(require, exports, module) {
//   var add = require('math').add;
//   exports.increment = function(val) {
//     return add(val, 1);
//   };
// });

// index.js
// define(function(require, exports, module) {
//   var inc = require('increment').increment;
//   inc(1); // 2
// });
// // AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎RequireJS，实际上AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出

// // 它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

// // RequireJS主要解决两个问题

// // 多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
// // js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长
// // RequireJs也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数:

// // 第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。math.add()与math模块加载不是同步的，浏览器不会发生假死

// // 作者：linwalker
// // 链接：https://www.jianshu.com/p/d67bc79976e6
// // 来源：简书
// // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
// // require([module], callback);

// // require([increment'], function (increment) {
// // 　   increment.add(1);
// // });

// // CMD
// define(function(require, exports, module) {
//     var a = require('./a')
//     a.doSomething()
//     // 此处略去 100 行
//     var b = require('./b') // 依赖可以就近书写
//     b.doSomething()
//     // ... 
//   })
  
//   // AMD 默认推荐的是
//   define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
//     a.doSomething()
//     // 此处略去 100 行
//     b.doSomething()
//     ...
//   }) 



//   AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎RequireJS，实际上AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出

// 它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

// RequireJS主要解决两个问题

// 多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
// js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长
// RequireJs也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数:

// 第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。math.add()与math模块加载不是同步的，浏览器不会发生假死。

// require([module], callback);

// require([increment'], function (increment) {
// 　   increment.add(1);
// });
// define()函数
// RequireJS定义了一个函数 define，它是全局变量，用来定义模块:
// define(id?, dependencies?, factory);
// 参数说明：

// id：指定义中模块的名字，可选；如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。

// 依赖dependencies：是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。
// 依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的长度属性小于3，加载器会选择以函数的长度属性指定的参数个数调用工厂方法。

// 工厂方法factory，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

// 来举个🌰看看：

// define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
//       exports.verb = function() {
//           return beta.verb();
//           //Or:
//           return require("beta").verb();
//       }
//   });
// RequireJs使用例子
// require.config是用来定义别名的，在paths属性下配置别名。然后通过requirejs(参数一，参数二)；参数一是数组，传入我们需要引用的模块名，第二个参数是个回调函数，回调函数传入一个变量，代替刚才所引入的模块。

// main.js
// //别名配置
// requirejs.config({
//     paths: {
//         jquery: 'jquery.min' //可以省略.js
//     }
// });
// //引入模块，用变量$表示jquery模块
// requirejs(['jquery'], function ($) {
//     $('body').css('background-color','red');
// });
// 引入模块也可以只写require()。requirejs通过define()定义模块，定义的参数上同。在此模块内的方法和变量外部是无法访问的，只有通过return返回才行.

// math.js
// define('math',['jquery'], function ($) {//引入jQuery模块
//     return {
//         add: function(x,y){
//             return x + y;
//         }
//     };
// });
// 将该模块命名为math.js保存。

// require(['jquery','math'], function ($,math) {
//     console.log(math.add(10,100));//110
// });
// main.js引入模块方法

// CMD
// CMD 即Common Module Definition通用模块定义，CMD规范是国内发展出来的，就像AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同。

// 在 CMD 规范中，一个模块就是一个文件。代码的书写格式如下:

// define(function(require, exports, module) {

//   // 模块代码

// });
// require是可以把其他模块导入进来的一个参数;而exports是可以把模块内的一些属性和方法导出的;module 是一个对象，上面存储了与当前模块相关联的一些属性和方法。

// AMD是依赖关系前置,在定义模块的时候就要声明其依赖的模块;
// CMD是按需加载依赖就近,只有在用到某个模块的时候再去require：

// // CMD
// define(function(require, exports, module) {
//   var a = require('./a')
//   a.doSomething()
//   // 此处略去 100 行
//   var b = require('./b') // 依赖可以就近书写
//   b.doSomething()
//   // ... 
// })

// // AMD 默认推荐的是
// define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
//   a.doSomething()
//   // 此处略去 100 行
//   b.doSomething()
//   ...
// }) 
// seajs使用例子

// // 定义模块  myModule.js
// define(function(require, exports, module) {
//   var $ = require('jquery.js')
//   $('div').addClass('active');
//   exports.data = 1;
// });

// // 加载模块
// seajs.use(['myModule.js'], function(my){
//     var star= my.data;
//     console.log(star);  //1
// });

// 作者：linwalker
// 链接：https://www.jianshu.com/p/d67bc79976e6
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。