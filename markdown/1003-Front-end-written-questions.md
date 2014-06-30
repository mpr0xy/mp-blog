/*<<

 Title: 一些前端笔试题
 Hidden: false
 Date: 2014-06-2４ 15:34:26
 Tags: Front, questions
 Category: Front
 Sources:
   me: /
>>*/

### 不知哪里来得题目，就做一做吧


### 1 请列举若干种提高CSS选择器工作效率得编写原则

* 
* 避免普遍规则
* 不要在ID选择器前面加类和标签选择器
* 不要在类选择器前面加标签选择器
* 避免使用后代,子元素和相邻元素选择器
* 尽可能使用具体得类别
* IE7和IE8下不要在非锚站元素上加:hover
*

不过这些原则都是１０年前总结出来得，今天得浏览器渲染技术已经在浏览器实现引擎里做了很大得优化，所以，你懂的．

#### 参考
* [css-selector-performance](http://www.w3cplus.com/css/css-selector-performance)
* [best-practices-rendering](https://developers.google.com/speed/docs/best-practices/rendering?csw=1)
* [CSS/Writing_efficient_CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_e,fficient_CSS)
* [css-selector-performance-has-changed-for-the-better](http://calendar.perfplanet.com/2011/css-selector-performance-has-changed-for-the-better/)
* [efficiently-rendering-css](http://css-tricks.com/efficiently-rendering-css/)
    
~


### 2 请指出下列代码运行结果，并解释原因：
<pre class="prettyprint">
var foo = function(name){
    alert('I am ' + name);
}

foo('Tom');

function foo(name){
    alert(name);
}
</pre>


我猜得答案是弹出Tom,因为我写node.js时遇到过这种情况，程序选择调用后面函数．

还是运行来看看吧．结果时我错了，foo调用的是var foo定义的函数．难道时变量得优先级比函数高，事实时函数得声明比变量得声明优先级高，但是变量被赋值后，变量就成了被赋值得类型．

#### 参考
* [JavaScript中函数声明优先于变量声明](http://www.cnblogs.com/snandy/archive/2012/03/01/2373237.html)
* [[翻译]JavaScript Scoping and Hoisting](http://www.cnblogs.com/betarabbit/archive/2012/01/28/2330446.html)
* [函数定义，声明提前及相关题目](http://www.cnblogs.com/blackwood/p/3178050.html)

~

### 3 指出jQuery的缺点（至少３点）
没有什么概念，找到一篇参考性的文章.

* [JQuery优缺点](http://www.cnblogs.com/jiayi/archive/2010/06/08/1754026.html)

～

### 4 指出任何一种非jQuery库得主要优点／特色
* Bootstrap　简洁，快速，跨浏览器兼容性好
* AngularJS 支持双向绑定，可以大量减少代码量

～

### 5 使用js获取当前时间戳

<pre class="prettyprint">
new Date().getTime()
new Data() - 0
</pre>

在网上找到一段更详细的

<pre class="prettyprint">
JavaScript 获取当前时间戳：
第一种方法：

var timestamp = Date.parse(new Date());
结果：1280977330000
第二种方法：

var timestamp = (new Date()).valueOf();
结果：1280977330748

第三种方法：

var timestamp=new Date().getTime()；
结果：1280977330748

第一种：获取的时间戳是把毫秒改成000显示，

第二种和第三种是获取了当前毫秒的时间戳。
</pre>

#### 参考
* [JS获取当前时间戳的方法](http://blog.sina.com.cn/s/blog_8772845101019kg5.html)

~

### ６　提供一个js版得求菲波那契序列的第Ｎ项的非递归实现
算法，我曾经得强项

<pre class="prettyprint">
function rabbit(N){
  if (N < 3){
    return 1;
  }
  var a = 1, b = 1, rabbit = 0;
  
  for (var i = 0; i < N - 2 ; i++){
    rabbit = a + b;
    a = b;
    b = rabbit;
  }
  return rabbit;
}
alert(rabbit(7))
</pre>

~

### 7 说明js中call函数和apply函数得作用和区别
call和apply都是用来让函数调用时切换上下文的，区别在于call提供的函数参数是正常形式，一个接一个得，apply需要传一个数组（或者一个类似数组得对象）作为函数得参数传入．

～

### 8　写２个三列布局结构，他们共享一套HTML代码对应不同得CSS,给出具体得CSS和HTML
<pre class="prettyprint">
<div class="main">
  <div class="A">
    A
  </div>
  <div class="B">
    <div class="BB">
      BB
    </div>
  </div>
  <div class="C">
    <div class="CC">
      CC
    </div>
  </div>
</div>
</pre>

1) 从左到右为ABC（总宽度100%: A: 100px, B: 自适应，　C:100px）

<pre class="prettyprint">
.A {
  background-color: black;
  float: left;
  width: 100px;
  margin-right: -100px;
}
.B {
  background-color: red;
  margin-right: -100px;
  margin-left: 100px;
  width: 100%;
  float: left;
}
.C {
  background-color: green;
  float: right;
  width: 100px;
  margin-left: -100px;
}
.main {
  width: 100%;
  overflow: hidden;
}
</pre>

2) 从左至右为ACB（总宽度100%: A:100px, B:自适应，　C:100px）

<pre class="prettyprint">
.A {
  background-color: black;
  float: left;
  width: 100px;
}
.B {
  width: 100%;
  float: right;
  margin-left: -200px;
}
.C {
  float: left;
  width: 100px;
  background-color: green;
}

.BB {
  margin-left: 200px;
  background-color: red;
}

.main {
  width: 100%;
  overflow: hidden;
}
</pre>


~

### 9 指出在js中使用事件代理(delegate)的方法与意义
方法：在目标元素得父元素添加事件监听器，捕获目标元素事件并处理．

意义：不用为每个目标元素都创建事件监听器．

~


### 10　解释什么是事件得冒泡和捕获
事件得冒泡时当目标元素接受到事件后，这个事件会从目标传递给目标元素得父元素，父元素再传递给父元素的父元素，一直到根元素document．

事件得捕获是当目标元素接受到事件后，事件会先从根元素，从最短路径依次传递事件到达目标元素，是冒泡的逆过程．