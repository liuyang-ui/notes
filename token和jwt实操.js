// 假定已经创建好虚拟环境，虚拟环境内安装了：

// asgiref             3.2.10 
// Django              3.1    
// djangorestframework 3.11.1 
// pip                 20.0.2 
// PyJWT               1.7.1  
// pytz                2020.1 
// setuptools          46.1.3 
// sqlparse            0.3.1  
// wheel               0.34.2 
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 即pip install django djangorestframework pyjwt
// mkdir jwt
// cd jwt

// 创建django项目：
// django startproject jwt_test

// 进入项目目录下创建api应用
// cd jwt_test
// django startapp api

// 修改settings，在33行INSTALLED_APPS下最后面加入：
// 'rest_framework',
// 'api',
// 1
// 2
// 修改时区和语言配置（105行）
// # LANGUAGE_CODE = 'en-us'
// LANGUAGE_CODE = 'zh-hans'
// # TIME_ZONE = 'UTC'
// TIME_ZONE = 'Asia/Shanghai'
// 1
// 2
// 3
// 4
// 此时项目目录
// .
// ├── api
// │ ├── admin.py
// │ ├── apps.py
// │ ├── init.py
// │ ├── migrations
// │ │ └── init.py
// │ ├── models.py
// │ ├── tests.py
// │ └── views.py
// ├── jwt_test
// │ ├── asgi.py
// │ ├── init.py
// │ ├── settings.py
// │ ├── urls.py
// │ └── wsgi.py
// ├── manage.py
// └── templates

// 一，最简单的token验证
// 修改api下views.py，创建api视图
// *args和**kwargs的区别
// import uuid

// from rest_framework.views import APIView
// from rest_framework.response import Response
// from api import models


// class LoginView(APIView):
//     """用户登录,一般采用不显示参数的post方法"""

//     def post(self, request, *args, **kwargs):
//         user = request.data.get('username')
//         pwd = request.data.get('password')
//         # 过滤数据库中数据，如果有对应的数据则返回第一个
//         user_object = models.UserInfo.objects.filter(username=user, password=pwd).first()
//         # 如果没有找到，就返回错误信息
//         if not user_object:
//             return Response({'code': 1000, 'error': '用户名或密码错误'})
//         random_string = str(uuid.uuid4())
//         user_object.token = random_string
//         user_object.save()
//         return Response({'code': 1001, 'token': random_string})
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// uuid的资料
// 6. 修改models.py创建数据模型

// from django.db import models


// # Create your models here.
// class UserInfo(models.Model):
//     """三个字段用户名，密码和令牌，其中设定token可以为空"""
//     username = models.CharField(max_length=32)
//     password = models.CharField(max_length=64)
//     # 模型类中设置:blank=True,表示代码中创建数据库记录时该字段可传空白(空串,空字符串)
//     token = models.CharField(max_length=64, null=True, blank=True)


// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 生成迁移文件：python manage.py makemigrations
// 执行迁移动作，根据迁移文件对数据库进行改动:python manage.py migrate
// 这时可以将生成db.sqlite3拖入pycharm右边的Database，展开看到有一个api_userinfo表，双击击可发现表已经生成
// 加入一条记录：
// 在这里插入图片描述

// 修改jwt_test下urls.py
// from django.contrib import admin
// from django.urls import path
// from api import views
// urlpatterns = [
//     path('admin/', admin.site.urls),

//     path('api/login',views.LoginView.as_view())
// ]
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 运行后访问
// 在这里插入图片描述可见成功，这是第一种最简单的登录验证，登录后将token保存到数据库，并且每登录一次换一个token，此处可以加一个字段用于失效时间处理。可见没有用到jwt
// 再模拟登录后使用token登录的场景
// urls.py加入url：
// from django.contrib import admin
// from django.urls import path
// from api import views

// urlpatterns = [
//     path('admin/', admin.site.urls),

//     path('api/login', views.LoginView.as_view()),
//     path('api/order', views.OrderView.as_view())
// ]
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// views.py加入：

// class OrderView(APIView):
//     def get(self, request, *args, **kwargs):
//         # 取get方法中通过url传递的参数
//         token = request.query_params.get('token')
//         if not token:
//             return Response({'code': 2000, 'error': '登录之后才能访问'})
//         # 从数据库中比对
//         user_object = models.UserInfo.objects.filter(token=token).first()
//         if not user_object:
//             return Response({'code': 2000, 'error': 'token无效'})
//         return Response('订单列表')

// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 测试：
// 未加token：
// 在这里插入图片描述加入错误token：
// 在这里插入图片描述正确token：
// 在这里插入图片描述

// 基于jwt实现
// urls.py加入:

// 	path('api/jwt/login', views.JwtLoginView.as_view()),
//     path('api/jwt/order', views.JwtOrderView.as_view()),
// 1
// 2
// views.py加入：

// class JwtLoginView(APIView):
//     def post(self, request, *args, **kwargs):
//         user = request.data.get('username')
//         pwd = request.data.get('password')
//         # 过滤数据库中数据，如果有对应的数据则返回第一个
//         user_object = models.UserInfo.objects.filter(username=user, password=pwd).first()
//         # 如果没有找到，就返回错误信息
//         if not user_object:
//             return Response({'code': 1000, 'error': '用户名或密码错误'})
//         import jwt
//         import datetime
//         salt = 'ssasdgf14sd4s5gf4s5s4fs'

//         # 构造header
//         headers = {
//             'typ': 'jwt',
//             'alg': 'HS256'
//         }
//         # 构造payload

//         payload = {
//             'user_id': user_object.id,  # 自定义用户ID
//             'username': user_object.username,  # 自定义用户名
//             'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=5)  # 有效时间5分钟
//         }

//         token = jwt.encode(payload=payload, key=salt, algorithm='HS256', headers=headers).decode('utf-8')
//         return Response({'code': 1001, 'token': token})


// class JwtOrderView(APIView):
//     def get(self, request, *args, **kwargs):
//         # 获取token并判断token的合法性
//         token = request.query_params.get('token')

//         # 1.切割
//         # 2, 解密第二段/判断过期
//         # 3，验证第三段合法性
//         import jwt
//         from jwt import exceptions
//         salt = 'ssasdgf14sd4s5gf4s5s4fs'
//         payload = None
//         msg = None
//         try:
//             payload = jwt.decode(token, salt, True)
//         except exceptions.ExpiredSignatureError:
//             msg = 'token已失效'
//         except jwt.DecodeError:
//             msg = 'token认证失败'
//         except jwt.InvalidTokenError:
//             msg = '非法的token'
//         if not payload:
//             return Response({'code': 1003, 'error': msg})
//         print(payload['user_id'], payload['username'])
//         return Response('订单列表')


// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// 34
// 35
// 36
// 37
// 38
// 39
// 40
// 41
// 42
// 43
// 44
// 45
// 46
// 47
// 48
// 49
// 50
// 51
// 52
// 53
// 54
// 55
// 56
// 57
// 测试成功：
// 在这里插入图片描述

// 模拟使用：
// 在这里插入图片描述

// 将jwt的加密和解密分别封装，并在各个api中默认使用
// urls.py加入：

//  	path('api/pro/login', views.ProLoginView.as_view()),
//     path('api/pro/order', views.ProOrderView.as_view()),
// 1
// 2
// views.py 中加入：

// from api.extensions.auth import JwtQueryParamsAuthentication
// from api.utils.jwt_auth import create_token


// class ProLoginView(APIView):
//     def post(self, request, *args, **kwargs):
//         user = request.data.get('username')
//         pwd = request.data.get('password')
//         # 过滤数据库中数据，如果有对应的数据则返回第一个
//         user_object = models.UserInfo.objects.filter(username=user, password=pwd).first()
//         # 如果没有找到，就返回错误信息
//         if not user_object:
//             return Response({'code': 1000, 'error': '用户名或密码错误'})
//         token = create_token({'user_id': user_object.id, 'username': user_object.username})
//         return Response({'code': 10001, 'token': token})


// class ProOrderView(APIView):
//     authentication_classes = [JwtQueryParamsAuthentication, ]

//     def get(self, request, *args, **kwargs):
//         print(request.user)
//         print(request.auth)
//         return Response('订单列表')
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 在api下创建目录：extensions
// 再创建auth.py
// 此处就是用户登录后要进行操作时的token认证
// auth.py加入：

// # 导入django配置文件
// from django.conf import settings
// # 从drf中导入认证模块
// from rest_framework.authentication import BaseAuthentication
// # 从drf中导入认证异常模块
// from rest_framework.exceptions import AuthenticationFailed
// import jwt
// from jwt import exceptions


// class JwtQueryParamsAuthentication(BaseAuthentication):
//     def authenticate(self, request):
//         # 获取token并判断token的合法性
//         token = request.query_params.get('token')

//         # 1.切割
//         # 2, 解密第二段/判断过期
//         # 3，验证第三段合法性
//         # 在drf里面对其进行了封装，会产生三种结果
//         # 1.抛出异常，后续不再执行
//         # 2.return一个元组(1,2),在视图中如果调用request.user，就是元组的第一个值，即payload；request.auth为第二个，即token
//         # 3. None
//         # 也就是说，只需要token跟salt，就能验证token是否正确，其详细操作可以查看源码，其实就是按照jwt，对其各步骤进行了封装

//         # 使用django配置中的SECRET_KEY作为盐
//         salt = settings.SECRET_KEY

//         try:
//             payload = jwt.decode(token, salt, True)
//         except exceptions.ExpiredSignatureError:
//             raise AuthenticationFailed({'code': 1003, 'error': 'token已失效'})
//         except jwt.DecodeError:
//             raise AuthenticationFailed({'code': 1003, 'error': 'token认证失败'})
//         except jwt.InvalidTokenError:
//             raise AuthenticationFailed({'code': 1003, 'error': '非法的token'})

//         return (payload, token)

// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// 34
// 35
// 36
// 37
// 38
// 在api下创建目录：utils
// 再创建jwt_auth.py
// 此处就是用户登录时生成token的单元
// jwt_auth.py加入：

// import jwt
// import datetime

// from django.conf import settings

// # 需要传入
// def create_token(payload, timeout=1):
//     salt = settings.SECRET_KEY

//     # 构造header
//     headers = {
//         'typ': 'jwt',
//         'alg': 'HS256'
//     }
    
//     # 其实就是往payload加入了有效时间
//     payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(minutes=timeout)  # 有效时间

//     token = jwt.encode(payload=payload, key=salt, algorithm='HS256', headers=headers).decode('utf-8')
//     return token
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 测试登录：
// 在这里插入图片描述测试验证：
// 在这里插入图片描述查看元组返回的payload和token
// 在这里插入图片描述使用drf封装好的jwt就是这样了，下面还可以优化：目前每个api验证时都需要加这一段：

// authentication_classes = [JwtQueryParamsAuthentication, ]
// 1
// 如果能在api使用时自动加入就更好了：
// 选中views.py中的APIView，即ProLoginView的基类，ctrl+B进入
// 可以发现有一段
// authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
// 这里就是设置默认APIView的验证类的地方
// 在settings.py中加入

// # 为所有接口添加验证
// REST_FRAMEWORK = {
//     "DEFAULT_AUTHENTICATION_CLASSES":['api.extensions.auth.JwtQueryParamsAuthentication']
// }
// 1
// 2
// 3
// 4
// 现在就可以把之前的authentication_classes = [JwtQueryParamsAuthentication, ]这一段注释掉了，调用接口时会自动验证
// 但是要注意，在不需要验证的地方要加入

// authentication_classes = []
// 1
// 取消默认验证，因为它不需要验证