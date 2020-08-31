// Promise是抽象的异步处理对象
// 构造方法
let promises=new Promise((resolve,reject)=>{
    resolve();//异步处理
})
// Promise 有三个状态：

// Fulfilled: has-resolved, 表示成功解决，这时会调用 onFulfilled.
// Rejected: has-rejected, 表示解决失败，此时会调用 onRejected.
// Pending: unresolve, 表示待解决，既不是resolve也不是reject的状态。也就是promise对象刚被创建后的初始化状态.
//上面我们提到 Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject
//resolve函数的作用是，将 Promise 对象的状态从 未处理 变成 处理成功 (unresolved => resolved)， 在异步操作成功时调用，并将异步操作的结果作为参数传递出去。

// reject函数的作用是，将 Promise 对象的状态从 未处理 变成 处理失败 (unresolved => rejected), 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise 实例生成以后，可以用 then 方法和 catch 方法分别指定 resolved 状态和 rejected 状态的回调函数。

// 上述构造方法中的两个参数resolve, reject即是改变promise的状态，resolve 方法把 Promise 的状态置为完成态（Resolved），
// 这时 then 方法就能捕捉到变化，并执行“成功”情况的回调​，resolve, reject可抛出结果，作为then方法中函数的参数。
// then可接受两个参数，第一个处理Resolved状态的函数，第二个处理Rejected函数。
// 如果只想处理成功，或者失败，对应参数可设置为null,只有一个参数则表示状态改变就执行，不区分状态结果。

// catch()方法，它可以和 then 的第二个参数一样，用来指定 reject 的回调，
// 另一个作用是，当执行 resolve 的回调（也就是上面 then 中的第一个参数）时，如果抛出异常了（代码出错了），那么也不会报错卡死 js，而是会进到这个 catch 方法中。

// all()方法，Promise 的 all 方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调, 会把所有异步操作的结果放进一个数组中传给 then。







//promise终极解决方案

function promiseClick(){
    let p = new Promise(function(resolve, reject){
        setTimeout(function(){
            var num = Math.ceil(Math.random()*20); //生成1-10的随机数
            console.log('随机数生成的值：',num)
            if(num<=10){
                resolve(num);
            }
            else{
                reject('数字太于10了即将执行失败回调');
            }
        }, 2000);
       })
       return p
   }

promiseClick().then(
    function(data){
        console.log('resolved成功回调');
        console.log('成功回调接受的值：',data);
    }, 
    function(reason, data){
        console.log('rejected失败回调');
        console.log('失败执行回调抛出失败原因：',reason);
    }
);


