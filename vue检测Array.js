// <!-- object通过getter/setter来实现侦测，但数组中有许多方法，如push来改变数组，但它并不会触发getter/setter。正因为我们可以通过Array原型上的方法来改变数组的内容，所有object那种通过getter/setter的实现方式就行不通了。 -->

// <!-- 可以用自定义的方法去覆盖原生的原型方法。

// （2）可以使用一个拦截器覆盖Array.prototype。之后，每当使用Array原型上的方法操作数组时，其实执行的都是拦截器中提供的方法，比如push方法。然后，在拦截器中使用原生Array的原型方法去操作数组 -->

var arr = [1,2,3,4]
arr.forEach((item,index)=>{
  Object.defineProperty(arr,index,{
    set:function(val){
      console.log('set')
      item = val
    },
    get:function(val){
      console.log('get')
      return item
    }
  })
})
arr[1]; // get 2
arr[1] = 1; // set 1
// 但是我们新增一个元素，就不会触发监听事件，因为这个新属性我们并没有监听，删除一个属性也是。
//从源码中可以看出，当数据时数组时，会停止对数据属性的检测
//当数据为数组时，依然检测其属性，然后在defineReactive函数中的get，set


//js中可以实现对数组进行监听，但在Vue中不能实现，主要是考虑到性问题

class Observer {
    constructor() {
     // 响应式绑定数据通过方法
     observe(this.data);
    }
   }
   
   export function observe (data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
     // 将data中我们定义的每个属性进行响应式绑定
     defineReactive(obj, keys[i]);
    }
   }


   
   export function defineReactive () {
    // ...省略 Object.defineProperty get-set
   }
   function defineReactive (obj, key, val) {
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        console.log('我被读了，我要不要做点什么好?');
        return val;
      },
      set: newVal => {
        if (val === newVal) {
          return;
        }
        val = newVal;
        console.log("数据被改变了，我要渲染到页面上去!");
      }
    })
  }
  
  let data = [1];
  // 对数组key进行监听
  defineReactive(data, 0, 1);
  console.log(data[0]); // 我被读了，我要不要做点什么好?
  data[0] = 2; // 数据被改变了，我要渲染到页面上去!

///////////////////////////////////////////////////////////////////////////////////

  //   而且监听数组所有索引的的代价也比较高，综合一些其他因素，Vue用了另一个方案来处理。
// 首先我们的observe需要改造一下，单独加一个数组的处理
  
  // 将data中我们定义的每个属性进行响应式绑定
export function observe (data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      // 如果是数组
      if (Array.isArray(keys[i])) {
        observeArray(keys[i]);
      } else {
        // 如果是对象
        defineReactive(obj, keys[i]);
      }
    }
  }
  
  // 数组的处理
  export function observeArray () {
    // ...省略
  }
  
  
   



// vue监听Array三部曲
// 第一步：先获取原生 Array 的原型方法，因为拦截后还是需要原生的方法帮我们实现数组的变化。
// 第二步：对 Array 的原型方法使用 Object.defineProperty 做一些拦截操作。
// 第三步：把需要被拦截的 Array 类型的数据原型指向改造后原型。
const arrayProto = Array.prototype // 获取Array的原型

function def (obj, key) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    value: function(...args) {
      console.log(key); // 控制台输出 push
      console.log(args); // 控制台输出 [Array(2), 7, "hello!"]
      
      // 获取原生的方法
      let original = arrayProto[key];
      // 将开发者的参数传给原生的方法，保证数组按照开发者的想法被改变
      const result = original.apply(this, args);

      // do something 比如通知Vue视图进行更新
      console.log('我的数据被改变了，视图该更新啦');
      this.text = 'hello Vue';
      return result;
    }
  });
}

// 新的原型
let obj = {
  push() {}
}

// 重写赋值
def(obj, 'push');

let arr = [0];

// 原型的指向重写
arr.__proto__ = obj;

// 执行push
arr.push([1, 2], 7, 'hello!');
console.log(arr);



// 判断是否有__proto__，因为部分浏览器是没有__proto__
const hasProto = '__proto__' in {}
// 重写后的原型
import { arrayMethods } from './array'
// 方法名
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

// 数组的处理
export function observeArray (value) {
  // 如果有__proto__，直接覆盖        
  if (hasProto) {
    protoAugment(value, arrayMethods);
  } else {
    // 没有__proto__就把方法加到属性自身上
    copyAugment(value, arrayMethods, )
  }
}

// 原型的赋值
function protoAugment (target, src) {
  target.__proto__ = src;
}

// 复制
function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key]);
  }
}

