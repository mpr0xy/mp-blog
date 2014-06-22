/**
 * Module dependencies.
 */
var express = require('express');
var lessMiddleware = require('less-middleware');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var mdb = require('./lib/markdownblog');

/**
 * Load config JSON file
 **/
var config = JSON.parse(require('fs').readFileSync(__dirname + '/config.json','utf8'));

// if this blog in the BAE(baidu app engine). reset host and port
var is_BAE = process.env.BAE_ENV_APPID ? true : false
if (is_BAE){
  config.host = 'whyexploit.duapp.com';
  config.port = 18080;
}


/**
 * Set default category and set default URL
 **/
// mdb.setDefault('category', 'General');
// mdb.setDefault('url', 'http://' + config.host + (is_BAE ? '' : ':' + config.port));

/**
 * Set basic variables passed to jade template
 **/
// mdb.setMeta('site', config.host); 
// mdb.setMeta('url', 'http://' + config.host);
// mdb.setMeta('author', config.author);
// mdb.setMeta('disqus', config.disqus);


/**
 * Index markdown folder
 **/
mdb.init(__dirname + '/' + config.paths.articles);


var app = express();

// app setting view engine
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// app use middleware
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());                            // parse application/json and application/x-www-form-urlencoded
app.use(morgan());




// default route
app.get('/', function(req, res){
  articles = mdb.getArticles()
  res.render('home', {articles: articles.slice(0, 7)})
});


/**
 * Display single blog post
 * @example http://xxx.com/markdown-guide-3158.html
 **/
app.get(/([A-Za-z0-9\-]+)(\.html)?/, function(req, res) {
  
  console.log(req.params[0]);
  var item = mdb.getArticle(req.params[0]);
  if (!item) {
    res.end('not found')
  }
  res.render('article', {article: item});
});





app.listen(config.port);
console.log('listen on %s:%d', config.host, config.port);