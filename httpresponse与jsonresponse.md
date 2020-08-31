<!-- Django服务器接收到客户端发送过来的请求后，
会将提交上来的这些数据封装成一个HttpRequest对象传给视图函数。
那么视图函数在处理完相关的逻辑后，也需要返回一个响应给浏览器。
而这个响应，我们必须返回HttpResponseBase或者他的子类的对象。
而HttpResponse则是HttpResponseBase用得最多的子类。 -->‘

<!-- HttpResponse含义
常用属性及其含义：

content:返回的类容
status_code:返回的HTTP响应状态码

def index(request):
    response.content='liuyang'//相当于response=HttpResponse('liuyang')
    response.status_code=400
    return response
content_type:返回数据MIME的类型，默认是Text/html，常见的content-type类型如下
1.text/html（默认的，html文件）

2.text/plain（纯文本）

3. text/css（css文件）

4. text/javascript（js文件）

5. multipart/form-data（文件提交）

6. application/json（json传输）

7. application/xml（xml文件）

8. 设置请求头：response['X-Access-Token'] = 'xxx'

常用方法
1. set_cookie：用来设置cookie信息.
2. delete_cookie:用来删除cookie信息
3. write：HttpResponse是一个类似于文件的对象，可以用来写入数据到数据中
def index(request):
    response = HttpResponse('hello')
    response.write('everyone')
    return response

jsonResponse:
from django.http import JsonResponse
def index(request):
    a=JsonResponse({"username":"wanrou","age":18})
    print(a.get('content-type'))          #此时结果为application/json
    return a
 -->
