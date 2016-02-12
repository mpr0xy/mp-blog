/* 
 * mardownblog
 * reproduc from node-markdownblog 1.0
 *
 */

/**
 *
 **/
var _ = require('lodash')
var fs = require('fs'),
yamlish = require('yamlish'),
marked = require('marked'),
moment = require('moment'),
markdownblog = {
  'meta' :    {},
  'path' :    {'articles': null, 'pages': null},
  'data' :    {'articles': {}, 'pages': {}, 'category': {}, 'tags': {}, 'widget': {}}, 
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

  fs.watch(dir, function(event, filename){
    // clear category and tags, reload articles
    this.data.category = {}
    this.data.tags = {}
    this.files.articles = fs.readdirSync(this.path.articles).sort();
    this.processArticles();    
  })

  // load link file
  this.data.widget.links = []
  var links = JSON.parse(require('fs').readFileSync(dir + '/links.json','utf8'));
  for (name in links)
  {
    this.data.widget.links.push({
      name: name,
      href: links[name]
    }) 
  }
}

/**
 * Process articles
 **/
exports.processArticles = function (){
  for (a = this.files.articles.length; a--;){
    if (this.files.articles[a].substr(-3, 3) != '.md'){
      continue
    }
    var article = this.parseFile(this.files.articles[a]);
    if (this.maxID < article.id){
      this.maxID = article.id
    }
    article.html    = this.md(article.content)  // markdown the content
    article.excerpt = getExcerpt(article.html)

    // store article
    this.data.articles[article.filename] = article

    // store category
    var _category = this.data.category[article.category]
    if (!_category){
      _category = {}
      _category.articles = []
      _category.number = 0
      this.data.category[article.category] = _category
    }
    _category.articles.push(article.filename)
    _category.number++

    // store tag 
    for(var i in article.tags){
      var _tag = this.data.tags[article.tags[i]]
      if (!_tag){
        _tag = {}
        _tag.articles = []
        _tag.number = 0
        this.data.tags[article.tags[i]] = _tag
      }
      _tag.articles.push(article.filename)
      _tag.number++
    }
    
    // store id -> filename
    this.mapping[article.id] = article.filename
  }
  this.data.widget.categories = this.getCategories()
  this.data.widget.tags = this.getTags()
}

/**
 * getCategories
 * @return array categories
 **/
exports.getCategories = function() {
  var categories = []
  for (var categoryName in this.data.category){
    var tmpjson = {}
    tmpjson.name = categoryName
    tmpjson.category = this.data.category[categoryName]
    categories.push(tmpjson)
  }
  return categories.sort(function(a, b){
    return b.number - a.number
  })
}

/**
 * getTags
 * @return array tags
 **/
exports.getTags = function() {
  var tags = []
  for (var tagName in this.data.tags){
    var tmpjson = {}
    tmpjson.name = tagName
    tmpjson.tag = this.data.tags[tagName]
    tags.push(tmpjson)
  }
  return tags.sort(function(a, b){
    return b.number - a.number
  })
}

/**
 * getWidget
 * @return json widget
 **/
exports.getWidget = function() {
  return this.data.widget
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
 * @param string type: category or tag or null
 * @param string name: correspond type  
 * @return array article
 **/
exports.getArticles = function (type, name){
  var _articles = [], filenames = []
  if (type === 'category'){
    filenames = this.data.category[name] ? this.data.category[name].articles : []
  }
  else if (type === 'tags'){
    filenames = this.data.tags[name] ? this.data.tags[name].articles : [] 
  }
  else{
    for (var key in this.data.articles){
      filenames.push(key)
    }
  }
  for (var i = 0; i < filenames.length; i++){
    var article = _.assign({}, this.data.articles[filenames[i]])
    article.html = ''
    article.content = ''
    article.date_format = article.date.format('LLLL')
    article.date_fromNow = article.date.fromNow()
    _articles.push(article)
  }
  return _articles
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
  var md_info = md_content[0].substr(5);  // /*<<\n    这里如果是在windows上编辑的文件 Title标题和上面的注释不能空行 否则会出问题
  md_info =  yamlish.decode(md_info);
  var name = md_info.Title;
  var id = filename.split('-').shift();
  var date = moment(md_info.Date);
  var tagsArray = md_info.Tags.split(', ').sort();
  var sourcesJson = md_info.Sources || {};
  var content = md_content[1];
  var category = md_info.Category

  filename = filename.substr(5)                         // 1001-
  filename = filename.substr(0, filename.length - 3)    // .md

  return {
    'name': name,
    'id': id * 1,
    'date': date,
    'category': category,
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
