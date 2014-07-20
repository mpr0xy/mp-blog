/*<<

 Title: jQuery学习笔记(using jquery core chapter one)
 Date: 2014-07-20 14:09:26
 Tags: jQuery
 Category: Front
 Sources:
   me: http://mpr0xy.com
>>*/

####前言
其实写这些没什么意思，因为[jQuery官网](http://learn.jquery.com/using-jquery-core/)都有．可是好记性不如写过一次．谁让自己记性不好呢．

###$ vs $()

$和$()的区别．简单来说就两点

* `$('#id')` 这样生成的时jQuery对象，这些对象调用得方法都时在`$.fn`这个命名空间里，方法里的`this`指向选择器选中对象本身．
* 通过`$`调用的是一般方法，不能和选择器一起工作，而且也不自动传递参数，返回值也是变化的．比如`$.map`

###$( document ).ready()
<pre>
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
});
</pre>
这个函数能保证，里面的代码在页面整个DOM渲染后才执行，这能保证所有操作DOM的代码执行正常．这个函数有个简写形式：
<pre>
// Shorthand for $( document ).ready()
$(function() {
    console.log( "ready!" );
});
</pre>
当然还有`$( window ).load(function() { ... })`这个函数用来等待页面所有东西加载完成（包括图片和框架）才执行代码．

###避免和其他库冲突
* 让jQuery进入不冲突模式:

<pre>
var $j = jQuery.noConflict();
// $j is now an alias to the jQuery function; creating the new alias is optional.
 
$j(document).ready(function() {
    $j( "div" ).hide();
});
</pre>

* 在加载其他库之前加载jQuery:
    
<pre>
// Use full jQuery function name to reference jQuery.
jQuery( document ).ready(function() {
    jQuery( "div" ).hide();
});
</pre>

* 使用立即执行函数表达式：

<pre>
jQuery.noConflict();

(function( $ ) {
    // Your jQuery code here, using the $
})( jQuery );
</pre>
    
* 使用参数传递给`jQuery( document ).ready()`执行：

<pre>
jQuery(document).ready(function( $ ) {
// Your jQuery code here, using $ to refer to jQuery.
});
</pre>

or

<pre>
jQuery(function($){
// Your jQuery code here, using the $
});
</pre>

###Attributes
作为setter:

<pre>
$( "a" ).attr( "href", "allMyHrefsAreTheSameNow.html" );
 
$( "a" ).attr({
    title: "all titles are the same too!",
    href: "somethingNew.html"
});
</pre>

作为getter:

<pre>
$( "a" ).attr( "href" ); // Returns the href for the first a element in the document
</pre>

###选择元素
选择元素得方法比较多，根本没法一下记住，但是有几个关键的点：

* 判断一个选择器返回得内容是否为空，下面的代码是错误的：
    
<pre>
// Doesn't work!
if ( $( "div.foo" ) ) {
    ...
}
</pre>
  
正确的代码如下：

<pre>
// Testing whether a selection contains elements.
if ( $( "div.foo" ).length ) {
...
}
</pre>
    
因为选择器返回的是一个对象.

* 经常用到的选择器需要缓存，这样能提高性能，选择器自带了很多过滤函数可以使用．

* 选择器返回的是jQuery对象或者选择器函数返回的是jQuery对象时，可以进行链式调用，如下：
    
<pre>
$( "#content" )
.find( "h3" )
.eq( 2 )
.html( "new text for the third h3!" );
</pre>
    
但下面的代码不能工作，因为`.html()`返回的不是jQuery对象.
    
<pre>
// Attempting to call a jQuery method after calling a getter.
// This will NOT work:
$( "h1" ).html().addClass( "test" );
</pre>
    
###操作元素
下面代码经常会用:
<pre>
.html() – Get or set the HTML contents.
.text() – Get or set the text contents; HTML will be stripped.
.attr() – Get or set the value of the provided attribute.
.width() – Get or set the width in pixels of the first element in the selection as an integer.
.height() – Get or set the height in pixels of the first element in the selection as an integer.
.position() – Get an object with position information for the first element in the selection, relative to its first positioned ancestor. This is a getter only.
.val() – Get or set the value of form elements.
</pre>

jQuery提供了简单的方法移动，复制元素，克隆元素．其中删除元素提供了两个：

* `.remove()`返回删除的元素，但是没有相关的数据和绑定的数据
* `.detach()`返回删除的元素，包含相关的数据和绑定的数据

创建元素实例代码：

```
// Creating new elements from an HTML string.
$( "<p>This is a new paragraph</p>" );
$( "<li class=\"new\">new list item</li>" );

// Creating a new element with an attribute object.
$( "<a/>", {
    html: "This is a <strong>new</strong> link",
    "class": "new",
    href: "foo.html"
});

// Getting a new element on to the page.
 
var myNewElement = $( "<p>New element</p>" );
 
myNewElement.appendTo( "#content" );
 
myNewElement.insertAfter( "ul:last" ); // This will remove the p from #content!
 
$( "ul" ).last().after( myNewElement.clone() ); // Clone the p so now we have two.
```

下面这段代码很好描述了怎么样高效的添加元素：

<pre>
var myItems = [];
var myList = $( "#myList" );
 
for ( var i = 0; i < 100; i++ ) {
    myItems.push( "<li>item " + i + "</li>" );
}
 
myList.append( myItems.join( "" ) );
</pre>

操作元素属性时，可以传入函数，在设置新属性时获取到旧的属性:

<pre>
// Using a function to determine an attribute's new value.
$( "#myDiv a:first" ).attr({
    rel: "nofollow",
    href: function( idx, href ) {
        return "/new/" + href;
    }
});
 
$( "#myDiv a:first" ).attr( "href", function( idx, href ) {
    return "/new/" + href;
});
</pre>

###jQuery对象
* 同一个DOM元素生成得jQuery对象不相对，看代码就明白，要相等，需要利用.get(0)获得第一个DOM元素,DOM元素是可以相等的：
   
<pre>
// Comparing jQuery objects.

alert( $( "#logo" ) === $( "#logo" ) ); // alerts "false"
// Comparing DOM elements.

// Comparing DOM elements (with more readable variable names).
 
var $logo1 = $( "#logo" );
var logo1 = $logo1.get( 0 );
 
var $logo2 = $( "#logo" );
var logo2 = $logo2.get( 0 );
 
alert( logo1 === logo2 ); // alerts "true"
</pre>
 
   
* jQuery对象不是活的，当从一个元素生成jQuery对象后，这个元素改变后，jQuery不会跟着改变．要实现这个，请使用[AngularJs](http://www.angularjs.org/).


