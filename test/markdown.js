var markdownblog = require('./../lib/markdownblog')

markdownblog.init('./../markdown')
console.info(markdownblog.getArticle(1001))

console.info(markdownblog.getArticle('markdown-guide'))