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
markdown = require('markdown').markdown,
markdownblog = {
  'meta' :    {},
  'path' :    {'articles': null, 'pages': null},
  'files' :   {'articles': [], 'pages': []},
  'tags' :    {},
  'default':  {},
  'mapping':  {},
  'md':       markdown,
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
  for (a = this.files.articels.length; a >= 0; a--){
    var article = this.parseFile(this.files.articels[a]);
    if (this.maxID < article.id){
      this.maxID = article.id
    }

  }
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
  name = md_info.Title;
  id = filename.split('-').shift();
  date = new Date(md_info.Date);
  tagsArray = md_info.split(', ').sort();
  sourcesJson = md_info.Sources || {};
  content = md_content[0];
  
  //TODO 
}
