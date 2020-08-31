// [AJAX系列]onreadystatechange事件
// posted @ 2016-09-17 17:23  霓裳梦竹  阅读(1874)  评论(0)  编辑  收藏
// 分类: Ajax
// 标签: Ajax
// onreadystatechange事件：
// 当请求被发送到服务器时，我们需要执行一些基于响应的任务

// 每当readyState改变时，就会触发onreadystatechange事件

// readyState属性存有XMLHttpRequest的状态信息

// XMLHttpRequest对象的三个重要的属性：

// 属性	描述
// onreadystatechange	存储函数（函数名）每次readystate改变时就会调用该函数
// readyState	
// 存有XMLHttpRequest的状态从0到4发生变化

// 0：请求未初始化

// 1：服务器连接已建立

// 2：请求已接收

// 3：请求处理中

// 4：请求已完成，且响应已就绪

// status	
// 200:"ok"

// 404:请求未找到

// 在onreadystatechange事件中，我们规定当服务器响应已做好被处理的准备时执行的任务

// 当readyState等于4且状态为200时，表示响应已就绪

// 复制代码
// 1 xmlhttp.onreadystatechange=function()
// 2   {
// 3   if (xmlhttp.readyState==4 && xmlhttp.status==200)
// 4     {
// 5     document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
// 6     }
// 7   }
// 复制代码
// onreadystatechange事件被触发5次，对应着readyState的每个变化

// 使用回调函数：
// 回调函数是一种以参数的形式传递给另一个函数的函数

// 如果页面存在多个AJAX任务，就应该为创建XMLHttpRequest对象编写一个标准的函数，并为每个AJAX任务调用该函数

// 该函数应该包含URL以及发生onreadystatechange事件执行时的任务

// 复制代码
//  1 <script>
//  2 var xmlhttp;
//  3 function loadXMLDoc(url,cfunc)
//  4 {
//  5 if (window.XMLHttpRequest)
//  6   {// IE7+, Firefox, Chrome, Opera, Safari 代码
//  7   xmlhttp=new XMLHttpRequest();
//  8   }
//  9 else
// 10   {// IE6, IE5 代码
// 11   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
// 12   }
// 13 xmlhttp.onreadystatechange=cfunc;
// 14 xmlhttp.open("GET",url,true);
// 15 xmlhttp.send();
// 16 }
// 17 function myFunction()
// 18 {
// 19 loadXMLDoc("/try/ajax/ajax_info.txt",function()
// 20   {
// 21   if (xmlhttp.readyState==4 && xmlhttp.status==200)
// 22     {
// 23     document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
// 24     }
// 25   });
// 26 }
// 27 </script>