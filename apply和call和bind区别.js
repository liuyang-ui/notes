var person = {
    name: "axuebin",
    age: 25
  };
  function say(job){
    console.log(this.name+":"+this.age+" "+job);
  }
  say.call(person,"FE"); // axuebin:25 FE
  say.apply(person,["FE"]); // axuebin:25 FE
  var sayPerson = say.bind(person,"FE");
  sayPerson(); // axuebin:25 FE
  console.log('=============================')
//==========================================================================
var obj = {
    a: 1
  }
  function foo(b, c){
    this.b = b;
    this.c = c;
    console.log(this)
    console.log(this.a + this.b + this.c);
  }
  foo.call(obj,2,3); // 6
  foo(2,3)
  console.log('==================================')
  //=================================================================================
  function Person(name, age){
    this.name = name;
    this.age = age;
    this.say = function(){
      console.log(this.name + ":" + this.age);
    }
  }
  console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
  function Student(name, age, job){
    console.log(this)
    Person.call(this, name ,age);
    console.log(this)
    this.job = job;
    this.say = function(){
        // console.log(this)
      console.log(this.name + ":" + this.age + " " + this.job);
    }
  }
  var me = new Student("axuebin",25,"FE");
  console.log(me.say()); // axuebin:25 FE
//=================================================================================
console.log('apply方法绑定上下文')
Function.prototype.myApply=function(context){
    console.log('+++++++++')
    console.log(context===this)
    console.log(this)
    console.log('========')
    // 获取调用`myApply`的函数本身，用this获取
    console.log(context.fn)
    context.fn = this;
    console.log(this)
    console.log(context.fn)
    // 执行这个函数
    context.fn();
    // 从上下文中删除函数引用
    delete context.fn;
  }
   
  var obj ={
    name: "xb",
    getName: function(){
      console.log(this.name);
    }
  }
   
  var me = {
    name: "axuebin"
  }
   
  obj.getName(); // xb 
  obj.getName.myApply(me); // axuebin