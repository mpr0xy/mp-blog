/*<<

 Title: Bind Call and Apply in JavaScript
 Date: 2014-08-23 23:09:26
 Tags: javascript
 Category: JavaScript
 Sources:
   me: http://mpr0xy.com
>>*/

原文在这里：[https://variadic.me/posts/2013-10-22-bind-call-and-apply-in-javascript.html](https://variadic.me/posts/2013-10-22-bind-call-and-apply-in-javascript.html)

这篇文章讲了下面这样的代码
```
var bind = Function.prototype.call.bind(Function.prototype.bind);
```

会得到这样得效果
```
x.y(z) -> y(x,z)
```

这里只能举例说明了，文章也是这样做的，不过最后我明白过来是写完了整个函数表达式才行的．

如果把上下文看成一个对象，叫做```contentObj```，有一个函数叫做```func```，有一个参数叫```argu```，可以得出如下结论．

```
//　call的情况
func.call(contentObj, argu)
// 相当于
contentObj.func(argu)

//　bind的情况
var newFunc = func.bind(contentObj, argu)

// newFunc() 是等于　contentObj.func(argu)的
```


那么现在再来看
```
var bind = Function.prototype.call.bind(Function.prototype.bind);
```

其实bind 就相当于 Function.prototype.bind.call

```
bind(func, contentObj)   // s1
// 相当于
Function.prototype.bind.call(func, contentObj)
// 相当于
func.bind(contentObj)   // s2
// 相当于
contentObj.func
```

从s2推到s1提现了```x.y(z) -> y(x,z)```

##总结
文中为什么要用相当于，因为我不知道这样理解是否完全准确，但至少便于我理解了这种调用形式．