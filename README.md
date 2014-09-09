##中文版
2014/06/03  完成基本框架，基于[express](https://github.com/visionmedia/express),[jade](https://github.com/visionmedia/jade),[less](https://github.com/emberfeather/less.js-middleware)

2014/07/01  博客基本开发完成


##English
2014/06/03 Complete the basic framework, based on [express](https://github.com/visionmedia/express),[jade](https://github.com/visionmedia/jade),[less](https://github.com/emberfeather/less.js-middleware)

2014/07/01 Blog basically developed


##TODO List

* 美化界面


##使用说明
本博客没有使用数据库，而是纯文本保存数据，使用github托管．编辑器使用Markdown．

启动博客
```
npm start
```
随后，在/markdown目录放置.md文件，刷新页面，就能看到新编写的文章了，当然文章头部格式需要按照定义的编写，复制一份，修改对应的地方就行．

其中资源目录/public放置到了aliapp上，加快访问速度．可以在config.json文件里的cdn字段进行设置．