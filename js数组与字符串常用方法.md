js字符串方法：

indexOf()字符串在指定文本首次出现的索引
lastIndexOf() 该字符串在文本中最后一次出现的索引

提取字符串：
slice(start,end)
subString(start,end)//不接受负值的索引
substr(start,length)//第二个参数规定提取部分的长度
replace()//另一个值替换在字符串中指定的值，replace只是替换文本中首次出现的值


toUpperCase()字符串转大写
toLowCase()字符串转小写

concat()连接两个或者多个字符串 text1.concat('',text2)

string.trim()删除字符串两端的空白符

charAt方法返回字符串指定下标位置的字符串

charCodeAt()

toString()方法以字符串返回值

valueOf()以数值返回

将变量转化为数值 Number() parseInt() parseFloat()

fruits.join("*")以*号连接数组

shift()方法删除首元素
unshift()向数组中添加新元素

delete 删除数组后会留下空间
delete a[2]

concat()合并连接数组，返回一个新数组，不改变原数组

slice()方法用数组的某个片段切出新数组，不改变原数组

fruits.sort()  fruit.reverse() Math.max(1,2,3)

Array.map()  Array.filter() Array.forEach() Array.reduce() Array.every()


var numbers = [65, 44, 12, 4];
function multiplyArrayElement(num) {
    return num * document.getElementById("multiplyWith").value;
}
function myFunction() {
    document.getElementById("demo").innerHTML = numbers.map(multiplyArrayElement);

# a="123"
# c=list(a)
# print(c)
b=list(map(int, input()))
print(b)

Array.find()返回通过测试的第一个数值元素的值
Array.findIndex(返回通过测试的第一个数组元素的索引
/////////////////////////////////////////////////////////////////////////////////////////
 Array.filter() 
 var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18;
}

function myFunction() {
    document.getElementById("demo").innerHTML = ages.filter(checkAdult);
}
//////////////////////////////////////////////////////////////////////////////////////////
Array.forEach()
var arr = [1, 2, 3, 4, 5];

arr.forEach(function (item) {
    if (item === 3) {
        return;
    }
    console.log(item);
});
///////////////////////////////////////////////////////////////////////////////////////////////
var numbers = [65, 44, 12, 4];
 
function getSum(total, num) {
    return total + num;
}
function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum);
}
//////////////////////////////////////////////////////////////////////////////////////////////
var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18;
}

function myFunction() {
    document.getElementById("demo").innerHTML = ages.every(checkAdult);
}
输出结果为:

false
///////////////////////////////////////////////////////////////////////////////////////////////////
