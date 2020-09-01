//浅拷贝：
// 只复制第一层的浅拷贝
function simpleCopy(obj1) {
    var obj2 = Array.isArray(obj1) ? [] : {};
    for (let i in obj1) {
    obj2[i] = obj1[i];
   }
    return obj2;
 }
 var obj1 = {
    a: 1,
    b: 2,
    c: {
          d: 3
       }
 }
 var obj2 = simpleCopy(obj1);
 obj2.a = 3;
 obj2.c.d = 4;
 alert(obj1.a); // 1
 alert(obj2.a); // 3
 alert(obj1.c.d); // 4
 alert(obj2.c.d); // 4

//直接赋值的方法
 let a=[0,1,2,3,4],
    b=a;
console.log(a===b);
a[0]=1;
console.log(a,b);
//  深拷贝：
采用递归去拷贝所有层级属性
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    
let a=[1,2,3,4],
    b=deepClone(a);
a[0]=2;
console.log(a,b);
// 通过JSON对象来实现深拷贝：
function deepClone2(obj) {
    var _obj = JSON.stringify(obj),
      objClone = JSON.parse(_obj);
    return objClone;
  }

//手动实现深度拷贝
  let obj1 = {
   a: 1,
   b: 2
}
let obj2 = {
   a: obj1.a,
   b: obj1.b
}
obj2.a = 3;
alert(obj1.a); // 1
alert(obj2.a); // 3

//用concat实现对数组的深拷贝
// 当数组里面的值是基本数据类型，比如String，Number，Boolean时，属于深拷贝
var arr1 = ["1","2","3"];
var arr2 = arr1.concat();
arr2[1] = "9";
console.log("数组的原始值：" + arr1 );
console.log("数组的新值：" + arr2 );
// 当数组里面的值是引用数据类型，比如Object，Array时，属于浅拷贝
var arr1 = [{a:1},{b:2},{c:3}];
var arr2 = arr1.concat();
arr2[0].a = "9";
console.log("数组的原始值：" + arr1[0].a ); // 数组的原始值：9
console.log("数组的新值：" + arr2[0].a ); // 数组的新值：9
