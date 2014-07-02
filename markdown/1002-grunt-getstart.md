/*<<

 Title: Grunt GetStart
 Hidden: false
 Date: 2014-06-23 15:34:26
 Tags: grunt, auto
 Category: Front
 Sources:
   Grunt: http://gruntjs.com/
>>*/

GRUNT
==
一个javascript任务运行器

官方网站有一个预览，我截了一个图,可以看到运行grunt后，依次完成了很多任务，最后输出全部完成没有错误．

![grunt preview](http://v1.freep.cn/3tb_140624105405bqf1512293.png)


如何开始
------
官方网站首页给了一个学习路线

１. [Getting Started](http://gruntjs.com/getting-started)
２. [Sample Gruntfile](http://gruntjs.com/sample-gruntfile)
３. [Configuring Tasks](http://gruntjs.com/configuring-tasks)


Getting Started
--------
Grunt和Grunt的插件都是通过[npm](https://npmjs.org/)安装管理的，所以确保你已经安装好了它，并且Node.js的版本`>=0.8.0`

## 安装命令行接口
为了能够启动Grunt，需要安装命令行接口，它得工作是启动
你已经安装好的一个Grunt版本，在接下来得Gruntfile里会涉及到，这将允许多个不同版本得Grunt在你机器上允许．^_^
<pre>
npm install -g grunt-cli
</pre>

## 命令行接口是怎么工作得
简单介绍后，官网让我们看一段简短的代码：
<pre>
#!/usr/bin/env node

'use strict';

process.title = 'grunt';

// Especially badass external libs.
var findup = require('findup-sync');
var resolve = require('resolve').sync;

// Internal libs.
var options = require('../lib/cli').options;
var completion = require('../lib/completion');
var info = require('../lib/info');
var path = require('path');


var basedir = process.cwd();
var gruntpath;

// Do stuff based on CLI options.
if ('completion' in options) {
  completion.print(options.completion);
} else if (options.version) {
  info.version();
} else if (options.gruntfile) { //Note: if both `gruntfile` and `base` are set, use `gruntfile`
  basedir = path.resolve(path.dirname(options.gruntfile));
} else if (options.base) {
  basedir = path.resolve(options.base);
}

try {
  gruntpath = resolve('grunt', {basedir: basedir});
} catch (ex) {
  gruntpath = findup('lib/grunt.js');
  // No grunt install found!
  if (!gruntpath) {
    if (options.version) { process.exit(); }
    if (options.help) { info.help(); }
    info.fatal('Unable to find local grunt.', 99);
  }
}

// Everything looks good. Require local grunt and run it.
require(gruntpath).cli();

</pre>
这段代码利用findup或resolve来得到grunt的入口文件，最后用require加载，这样就启动了项目中安装得grunt了．

## 在存着Grunt的项目里工作
1. 到项目得根目录 
2. 使用`npm install`安装项目依赖
3.　运行Grunt `grunt`

## 准备一个新的Grunt项目
两个重要得文件

* package.json 
* Gruntfile (名字是Gruntfile.js或者Gruntfile.coffee)

### package.json
这里有几种方法可以创建package.json文件

* [grunt-init](http://gruntjs.com/project-scaffolding)
* [npm init](https://npmjs.org/doc/init.html)
* [specification](https://npmjs.org/doc/json.html)

### 安装Grunt和Grunt插件
如果存着package.json使用这个命令安装
`npm install <module> --save-dev`．这个命令不仅安装了`<module>`,还自动把模块添加到了devDependencies节．

## Gruntfile
Gruntfile是一个有效的js或者CoffeeScript文件，放在项目得根目录．

一个Grunt文件包含下面几个部分：

* 一个包装函数
* 项目和任务得配置
* 加载Grunt插件和任务
* 自定义任务


## 一个Gruntfile

<pre>
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
</pre>

### ＂包装＂函数
每个Gruntfile使用的基本格式
<pre>
module.exports = function(grunt){
    // Do grunt-related things in here
}
</pre>

### 项目和任务配置
grunt.initConfig里，pkg是读取package.json里的元数据，而uglify是用来压缩文件的，banner是自定义的一段注释，build指定了压缩的源文件和目标文件．

### 加载Grunt插件和任务
<pre>
// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
</pre>
插件会在package.json里作为依赖，也要在Gruntfile里加载．

Note:`grunt --help`可以列出可用的任务

### 自定义任务
你可以自定义一个或多个任务作为默认任务，这样运行`grunt`时就会运行默认任务．

如果你需要的任务没在插件里，你可以使用
<pre>
// A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });
</pre>