/* 
 * mardownblog
 * reproduc from node-markdownblog 1.0
 *
 */

/**
 *
 **/
var fs = require('fs'),
yamlish = require('yamlish'),
marked = require('marked'),
moment = require('moment'),
markdownblog = {
  'meta' :    {},
  'path' :    {'articles': null, 'pages': null},
  'data' :    {'articles': {}, 'pages': {}}, 
  'files' :   {'articles': [], 'pages': []},
  'tags' :    {},
  'default':  {},
  'mapping':  {},
  'md':       marked,
  'maxID':    1001  
},
exports = module.exports = markdownblog;


/**
 * load articles
 * @param string dir directory for articles 
 **/
exports.init = function (dir) {
  // TODO check dir is valid
  this.path.articles = dir;
  this.files.articles = fs.readdirSync(this.path.articles).sort();
  this.processArticles();
}

/**
 * Process articles
 **/
exports.processArticles = function (){
  for (a = this.files.articles.length; a--;){
    var article = this.parseFile(this.files.articles[a]);
    if (this.maxID < article.id){
      this.maxID = article.id
    }
    article.html    = this.md(article.content)  // markdown the content
    article.excerpt = getExcerpt(article.html)

    this.data.articles[article.filename] = article

    this.mapping[article.id] = article.filename
  }
}


/**
 * getArticle
 * @param string filename (markdown-guide) or id int
 * @return json article
 **/
exports.getArticle = function (id){
  var article = null
  if (typeof(id) === 'string'){
    article = this.data.articles[id]
  }
  else if (typeof(id) === 'number'){
    article = this.data.articles[this.mapping[id]]
  }

  if (!article) {
    return null
  }
  return article
}

/**
 * getArticles
 * @param boolean if true set articles.html = '' 
 * @return array article
 **/
exports.getArticles = function (isExcerpt){
  var data = []
  for (var filename in this.data.articles){
    var article = this.data.articles[filename]
    if (isExcerpt){
      article.html = ''
      article.content = ''
      article.date_format = article.date.format('LLLL')
      article.date_fromNow = article.date.fromNow()
    }
    data.push(article)
  }
  return data
}


/**
 * Parse file 
 * @param string filename (1001-who-am-I.md)
 * @return json fileinfo
 **/
exports.parseFile = function(filename) {
  // md_content[0] like this
  /*<<
 
  Title: how to make love with a girl
  Date: 2014-04-01 12:14:05
  Category: love
  Tags: love, girl
  Sources: 
    github: http://github.com
  >>*/
  var md_content = (fs.readFileSync(this.path.articles + '/' + filename) + '').split('>>*/');
  var md_info = md_content[0].substr(5);  // /*<<\n
  md_info =  yamlish.decode(md_info);
  
  var name = md_info.Title;
  var id = filename.split('-').shift();
  var date = moment(md_info.Date);
  var tagsArray = md_info.Tags.split(', ').sort();
  var sourcesJson = md_info.Sources || {};
  var content = md_content[1];

  filename = filename.substr(5)                         // 1001-
  filename = filename.substr(0, filename.length - 3)    // .md

  return {
    'name': name,
    'id': id * 1,
    'date': date,
    'tags': tagsArray,
    'sources': sourcesJson,
    'content': content,
    'filename': filename
  }
  //TODO 
}


/**
 * 
 * @param string html
 * @return string html excerpt
 **/
function getExcerpt(html){
  var excerpt = html.split('</p>')
  var max = 3
  var i = 0
  var data = ''
  while(i < max && i < excerpt.length){
    data += excerpt[i] + '</p>'
    i++
  }
  return data
}
