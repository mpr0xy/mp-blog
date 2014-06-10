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
mardownblog = {
  'meta' : {},
  'path' : {'articles': null}
}

exports = module.exports = mardownblog;


/**
 * Parse file 
 * @param string filename
 * @return json fileinfo
 **/
exports.parseFile = function(filename) {
  // md_content[0] like this
  /*<<
 
  Title: how to make love with a girl
  Date: 2014-04-01 12:14:05
  Category: love
  Tags: love, girl
  Sources: github.com
  >>*/
  var md_content = (fs.readFileSync(this.path.articles + '/' + filename) + '').split('>>*/');
  var md_info = md_content[0].substr(5);  // /*<<\n
 
  md_info =  yamlish.decode(md_info);
  //TODO 
}
