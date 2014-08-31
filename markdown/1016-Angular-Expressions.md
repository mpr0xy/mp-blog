/*<<

 Title: AngularJS表达式
 Date: 2014-08-31 17:09:26
 Tags: javascript, AngularJS
 Category: JavaScript
 Sources:
   me: http://mpr0xy.com
>>*/

人生苦短，我用python.
人生苦短，我也用AngularJS.

Angular表达式像JavaScript代码片段，在两个大括号里放置绑定的表达式.像这样``` {{ 表达式 }} ```.

举个例子，下面都是有效的Angular表达式：

```
1+2
a+b
user.name
items[index]
```

##Angular表达式和JavaScript表达式的不同

* 上下文: JavaScript表达式执行在全局```window```对象下，在Angular里，表达式执行在```scope```对象里．
* 宽松的表达式: 在JavaScript表达式里，试图执行未定义得属性会产生引用错误或者类型错误，在Angular里，表达式里会忽悠未定义和空变量．
* 没有控制流程语句: 不能在Angular里使用下列表达式: 条件，循环，或者异常．
* 过滤器: 你可以在表达式里使用过滤器来格式化数据在展示它之前．

假如想要运行复杂的JavaScript代码，应该让它成为控制器的方法，在模板里调用．假如你想在Angular表达式里使用```eval()```，使用```$eval()```方法．

##Context
Angular不使用JavaScript的```eval()```来执行表达式，而是用Angular的[$parse](https://docs.angularjs.org/api/ng/service/$parse)服务来执行表达式．

Angular表达式没有权限访问全局变量，像```window```, ```document```或者```location```等．这是故意设计的，为了阻止访问全局状态 – 微妙bug的常见来源．

使用一些替代的服务，像```$window```和```$location```在函数通过表达式调用，这些服务可以提供一个虚伪的对全局变量的访问.


##Forgiving
表达式执行会宽容未定义的和空的变量，在JavaScrit中，执行```a.b.c```会抛出异常，假如a不是一个对象．虽然这对通用语言来说是有意义的，表达式执行通常用来数据绑定，就像这样：
```
{{a.b.c}}
```
当a为未定义时，什么都不显示比抛出一个异常更有意义(也许我们在等待服务器返回，它即将被定义)．假设表达式执行不被宽容，我们就必须绑定数据时这样写凌乱的代码:```{{((a||{}).b||{}).c}}```

同样的，调用```a.b.c()```函数时未定义或者为空只会返回未定义．

##No Control Flow Statements
除了三元运算符```（A ? B：C）```，不可以在表达式里写控制流程语句。这背后的原因是Angular的核心哲学，应用程序逻辑应该是在控制器上，而不是试图里。如果你需要一个真正的条件，循环，或从视图表达式抛出异常，委托给一个JavaScript方法来代替。

##$event
像ngClick和ngFocus指令会在表达式范围里暴露一个```$event```对象．

```$event```对象在数据绑定的范围外．```{{$event}}```这样的语句访问不了$event对象
