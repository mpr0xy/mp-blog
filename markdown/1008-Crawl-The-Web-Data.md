/*<<

 Title: Crawl The Web Data
 Date: 2014-07-16 14:09:26
 Tags: node.js, crawl
 Category: node.js
 Sources:
   me: http://mpr0xy.com
>>*/

####需求很简单
最后的效果代码如下
<pre>
var request = require('request');
var async = require('async');
var jsdom = require("jsdom");


serverurl = "http://itjuzi.com/investfirm/"

step = []

array = [1, 2, 3, 4]

// 生成函数
array.forEach(function(i){
  var fun = function(callback){
      request({
        url      : serverurl + i,
        method   : 'GET',
        strictSSL: false,
        timeout  : 120000
      }, function(err, res){requestHandler(err, res, callback, i)})
  }
  step.push(fun)
})

// 利用async，等待程序执行完获得数据
async.parallel(step, function(err, res){
  if (err){
    console.log(err)
  }
  else{
    console.log(res)
  }
})

// request的回调函数
function requestHandler(err, res, callback, i){
  jsdom.env(
    res.body,
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
      console.log(i + ": ", window.$(".public-info a").text());
      callback(null, i)
    }
  );
}
</pre>

##遇到的问题
* 正则表达式:

    一开始没有用jsdom，而是使用了正则表达式，还纠结在了怎么样用dot match newline,`[\s\S]`.然后就把js的得正则对象和字符对象得正则相关的函数恶补了下，回头还得接着看．
    
* 生成函数:

    生成一系列函数，并要提前给这些函数传递一些参数时，肯定要用循环，但是javascript里，for循环是没有单独的变量作用域的．导致了for循环里(比如`for(var i=0; i < max; i++)`这里的i作为值)给生成函数绑定的值，循环结束，所有函数绑定的值都是最后一个i的值．解决这个问题上面得代码里用到了forEach，通过一个函数分离里每个i的作用域．当然用for时，可以用立即执行函数创建一个闭包，也能正确给生成得函数绑定值．当然一些库提供了这些功能，比如[underscore](http://underscorejs.org/),当然这是我瞎说得，没有具体求证．
    



