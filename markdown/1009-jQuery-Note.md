/*<<

 Title: jQuery学习笔记
 Date: 2014-07-16 14:09:26
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

