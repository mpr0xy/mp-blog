var fs = require("fs")


fs.watch('w_test', function(event, filename) {
  console.log(event)
  console.log(filename)
})


/*var _ = require('lodash')
var a = {name: 'mp'}
var b
b = _.clone(a)
b.kkk = 0
console.log(b)
/*
var markdownblog = require('./../lib/markdownblog')

markdownblog.init('./../markdown')
console.info(markdownblog.getArticle(1001))

console.info(markdownblog.getArticle('markdown-guide'))
*/