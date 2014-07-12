/*<<

 Title: 博客开发(一)＞架构
 Date: 2014-07-1 14:09:26
 Tags: javascript, node.js
 Category: Front
 Sources:
   me: http://mpr0xy.com
>>*/


##前言
这么小一个blog系统哪有什么架构可谈，纯属扯淡．cool

##选择
想写blog了，途省事，就在csdn开了一个，用了才发现，发文章时有些连接是禁止了，这个烦呀，还试过用短网址绕过，结果短网址也给禁止了．

后来想着用开源blog(node.js开发的，为什么，因为我想做一个前后端兼修，有统一的开发者，所以javascript时首选了)搭建一个吧，github上也可以搭建纯静态的blog．试了ghost，发现代码量还是不少．觉得得找个代码量少点得blog自己来改一改．找啊找，找到了这个？？

代码量确实少，没有数据库，基于markdown的文件写作，读取.md文件渲染后返回给浏览器，因为代码量少，干脆不用改．我直接按照这个模式重新写一个得了，期间还修正了一些bug．比如选择了更好得markdown解析库等．

##界面设计
因为是blog，用来写作，还原文字得力量，所以界面设计参考了简书的文章页面．同时也加入一些blog必须有得东西．因为不懂设计，所以界面尽量保持了简单，简陋，突出文章．

首页加入了无限滚动翻页，全站回到顶部按钮，文章页面有言和disqus留言．文章可以通过首页，category，tags进行访问．

##运维
当然要够自动化呢，玩了一下[ansible](http://www.ansible.com/)．

首先需要解决得问题是连接一台新服务器时，怎么在上面新建一个用户，把sshkey设置好，设置新用户可以sudo等，搞了几个小时（智商拙计呀），最后终于搞了一个能用得版本．playbook如下：

```
---
- hosts: myweb.com
  remote_user: app
  
  tasks:
  - name: add user mpr0xy
    user: name=mpr0xy groups=sudo,adm,ssh password=$6$DKa3vzGNTkHSFQ$G7DeXh8M7prRjN4XBCd9gZdZc7O1kL6uG16jYjqwJYM6ke2OGmDIXh.YGpPfkMV8iSc0cfY9MSELm.ZudgjRC1
  - name: copy id_rsa to myweb.com
    copy: src=/home/mcpr0xy/.ssh/id_rsa.pub dest=/home/mpr0xy/.ssh/
  - name: make authorized_keys
    shell: cat /home/mpr0xy/.ssh/id_rsa.pub > /home/mpr0xy/.ssh/authorized_keys
  - name: add sudo_user_list
    shell: echo "mpr0xy ALL=(ALL) ALL" >> /etc/sudoers.d/sudo_user_list  

```

其中password得问题参考[这里](http://docs.ansible.com/faq.html#how-do-i-generate-crypted-passwords-for-the-user-module)

但是运行这个唯一得条件是，app这个用户可以sudo运行．启动得命令
<pre>
ansible-playbook init.yml --ask-pass --ask-sudo-pass -s
</pre>

##问题
文章数目不够多，质量也不高，这个没法通过代码解决，得动脑筋继续写，继续写，继续写．昨天就遇到写Javascript的一个问题．
<pre>
var a = {name: 'mp'}
var b = a
b.name = 'not mp'
console.log(a)
// Object {name: "not mp"} 
</pre>
一个对象赋值给另一个对象，实际时引用了原始对象．要想复制一个新对象出来得深度赋值，这用到了[lodash](http://lodash.com/)提供的_.clone函数，轻松复制对象．