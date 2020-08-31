func().then(function(){
    return cb();
});
// =====================
func().then(function(){
    cb();
});
//=======================
func().then(cb());
//=======================
func().then(cb)

let func = function(){
    return new Promise((resolve,reject)=>{
        resolve('返回值')
    })
};

let cb=function(){
    return('新的值')
};

func().then(function(){
    return cb();
}).then(resp=>{
    console.warn(resp);
    console.warn('1===============<');
})

func().then(function(){
    cb();
}).then(resp=>{
    console.warn(resp);
    console.warn('2===============<')
});
func().then(cb()).then(resp=>{
    console.warn(resp);
    conmsole.warn('3=============<')
})
func().then(cb).then(resp=>{
    console.warn(resp);
    console.warn('4================<')
})
//新的值
//1===============<
//undefined
//2===============
//返回值
//3=============<
//新的值
//4================<


                    