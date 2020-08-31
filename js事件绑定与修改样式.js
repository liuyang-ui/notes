//鼠标点击事件
节点对象.onclick=function(){
    alert("div标签被鼠标点击了")
}
//鼠标划入事件
节点对象.onmouseover=function(){
    alert("鼠标移入了")
}


// js样式控制
通过id将样式切换为写好的样式
通过内联样式的方式修改样式
节点对象.style.cssText = "height:300px; background: red; margin-top:20px ";
节点对象.style.background = "skyblue";
节点对象.style.width = "500px";
节点对象.style.height = "300px";
节点对象.style["margin-top"] = "20px";
节点对象.style.marginLeft = "50px";





$(function () {
    $(".btn-default").click(function () {
        $(this).removeClass("btn-default");
        $(this).addClass("btn-primary");
        $(this).siblings().removeClass("btn-primary");
        $(this).siblings().addClass("btn-default");
    });
});




document.getElementById("btn1").setAttribute("class","btn btn-primary");
 
document.getElementById("btn1").className = "btn btn-primary";//btn btn-primary可以改为任意新的class值

document.getElementById('region').className;//表示获取id为region的div的class值
document.getElementById('region').className = "";//表示将id为btn1的按钮的class属性值设置为空