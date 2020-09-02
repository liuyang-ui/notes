// 单例模式
//单例模式能保证一个类只有一个实例，实现方法：先判断实例是否存在，如果存在则直接返回，否则创建实例后在返回

// var instance = null
// var getInstance=function(arg){
//     if(!instance){
//         instance=arg
//     }
//     return instance   
// }
// var a=getInstance('a')
// var b=getInstance('b')
// console.log(a===b)
//这种定义一个全局变量的方式非常的不优雅，也不好复用代码

//利用闭包实现单例
// var Singleton =function(name){
//     this.name=name
// }
// Singleton.getInstance=(function(){
//     var instance=null
//     return function(name){
//         if(!instance){
//             instance=new Singleton(name)
//         }
//         return instance
//     }
// })()
// var a=Singleton.getInstance('a')
// var b =Singleton.getInstance('b')
// console.log(a===b)

// //使用ES6创建类

// class Singleton {
//     constructor(name) {
//         this.name = name;
//         this.instance = null;
//     }
//     static getInstance(name) {
//         if(!this.instance) {
//             this.instance = new Singleton(name);
//         }
//         return this.instance;
//     }
// }
// var oA = Singleton.getInstance('hi');
// var oB = Singleton.getInstance('hisd');
// console.log(oA===oB);

// //代理模式
// //用户本体
// function User(name,code){
//     this.name = name ;
//     this.code = code ;
// } ;
// User.prototype = {
//     getName : function(){
//         return this.name ;
//     } ,
//     getCode : function(){
//         return this.code ;
//     } ,
//     post : function(){
//         console.log("发帖子！") ;
//     } ,
//     remove : function(){
//         console.log("删除帖子！") ;
//     } ,
//     check : function(){
//         console.log("审核帖子！") ;
//     } ,
//     comment : function(){
//         console.log("回复帖子！") ;
//     }
// } ;
// 注册普通用户：code为“001”

// 论坛管理者   ：code为“002”

// 系统管理者   ：code为“003”

// 游        客    ：code为“000”
//代理论坛类
// function Forum(user){
//     this.user = user ;
// } ;
// Forum.prototype = {
//     getUser : function(){
//         return this.user ;
//     } ,
//     post : function(){
//         if(this.user.getCode() == "001" || this.user.getCode() == "003"){
//             return this.user.post() ;
//         }
//         console.log("没权限发帖子！") ;
//     } ,
//     remove : function(){
//         if(this.user.getCode() == "002" || this.user.getCode() == "003"){
//             return this.user.remove() ;
//         }
//         console.log("没权限删除帖子！") ;
//     } ,
//     check : function(){
//         if(this.user.getCode() == "002" || this.user.getCode() == "003"){
//             return this.user.check() ;
//         }
//         console.log("没权限审核帖子！") ;
//     } ,
//     comment : function(){
//         if(this.user.getCode() == "003"){
//             return this.user.comment() ;
//         }
//         console.log("没权限回复帖子！") ;
//     }
// } ;
// //功能测试
// function ForumClient(){
//      this.run = function(){
//          new Forum(new User("bigbear","003")).check() ; // 审核帖子
//      }
//  } ;


 //观察者模式
// 观察者模式
//订阅类
class Subject {
    constructor (){
        this.state = 0
        this.observers = []  //所有的观察者
    }
    getState() {
        return this.state
    }
    setState(state){
        this.state = state
        this.notifyAllObservers()
    }
    notifyAllObservers(){
        this.observers.forEach( observer => {
            observer.update()
        })
    }
    attach(observer){
        this.observers.push(observer)
    }
} 
//观察者类
class Observer {
    constructor(name ,subject){
        this.name = name 
        this.subject = subject
        this.subject.attach(this) //把观察者添加到主题中观察者列表上来
    }
    update(){
        console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
}

let s = new Subject()
let o1 = new Observer('o1', s)
let o2 = new Observer('o2', s)
let o3 = new Observer('o3', s)

s.setState(1)
s.setState(2)
s.setState(3)


