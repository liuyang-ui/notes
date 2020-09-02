// function User(name,pass){
//     this.name=name
//     this.pass=pass
// }
// User.prototype.showName=function(){
//     alert(this.name)
// }
// User.prototype.showPass=function(){
//     alert(this.pass)
// }

// class User{
//     constructor(name,pass){
//         this.name=name;
//         this.pass=pass
//     }
//     showName(){

//     }

// }
// var u1=new User('blue','123456')
// u1.showName()
// u1.showPass()

// //继承：
//  function VipUser(name,pass,level){
//      User.call(this,name,pass);
//      this.level=level
//  }
// VipUser.prototype=new User()
// VipUser.prototype.constructor=VipUser 

// VipUser.prototype.showLevel=function(){
//     alert(this.level)
// }
class VipUser extends User{
    constructor(name,pass,level){
        super(name,pass)
        this.level=level  
    }
    showLevel(){
        alert(this.level)
    }
}
var u1=new User('blue','123456')
u1.showName()
u1.showPass()