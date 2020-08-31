//默认绑定
var a = 2;
function foo(){
    console.log(this.a);
}
function bar(){
    var a = 5;
    foo();
}
bar(); // 2
//隐式绑定
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42
//显示绑定
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

var bar = function() {
    foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// 硬绑定后bar无论怎么调用，都不会影响foo函数的this绑定
bar.call( window ); // 2

//

