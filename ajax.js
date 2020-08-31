$.ajax({  
    type:"POST", 
    url:"Venue.aspx?act=init", 
    dataType:"html", 
    async:false,
    success:function(result){  //function1()
 
   } ,
    failure:function (result) {  
    //  alert('Failed');  
    }
})
// 当把asyn设为false时，这时ajax的请求时同步的
// ，也就是说，这个时候ajax块发出请求后，他会等待在function1（）这个地方，不会去执行function2()，直到function1()部分执行完毕。
var returnValue = null; 
xmlhttp = createXmlHttp(); 
xmlhttp.onreadystatechange = function() { 
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
    if (xmlhttp.responseText == "true") { 
      returnValue = "true"; 
    } 
    else { 
      returnValue = "false"; 
    } 
  } 
}; 
xmlhttp.open("Post",url,true); //异步传输 
xmlhttp.setRequestHeader("If-Modified-Since","0"); //不缓存Ajax
xmlhttp.send(sendStr); 
return returnValue;