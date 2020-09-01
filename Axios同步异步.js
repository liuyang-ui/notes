//     （1）await右侧的表达式一般为promise对象, 但也可以是其它的值
//     （2）如果表达式是promise对象, await返回的是promise成功的值
//     （3）如果表达式是其它值, 直接将此值作为await的返回值

async function fn1() {
    return 1
  }
  let res = fn1();
  console.log(res) //Promise { 1 }*/

  function fn2() {
    return Promise.reject(2)
  }

  async function test() {
    //  let result = fn2().then(value => {
    // 　　　　console.log('value',value)
    // },
    // reason => {
    // 　　console.log('reason',reason)
    // });
    try {
      let result = await fn2();
      console.log('result', result)
    } catch (error) {
      console.log('error', error)
    }
  }

  test()
  console.log('-----')
//   Axios本身不能实现同步调用
//要实现同步调用，可以使用Async和await,