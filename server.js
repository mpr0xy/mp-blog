/**
 * Module dependencies.
 */
var express = require('express');
var lessMiddleware = require('less-middleware');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var mdb = require('node-markdownblog');

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
mdb.setDefault('category', 'General');
mdb.setDefault('url', 'http://' + config.host + (is_BAE ? '' : ':' + config.port));

/**
 * Set basic variables passed to jade template
 **/
mdb.setMeta('site', config.host); 
mdb.setMeta('url', 'http://' + config.host);
mdb.setMeta('author', config.author);
// mdb.setMeta('disqus', config.disqus);


/**
 * Index markdown folder
 **/
mdb.index(__dirname + '/' + config.paths.articles);


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
  res.render('home');
});


/**
 * Display single blog post
 * @example http://xxx.com/markdown-guide-3158.html
 **/
app.get(/([A-Za-z0-9\-]+\-([0-9]+)\.html)/, function(req, res) {
  
  var item = mdb.getArticle([req.params[1]], '');
  if (!item) {
    throw new NotFound; 
  }
  if (item.url != mdb.getDefault('url') + req.url) {
    return res.redirect(item.url, 301); 
  }
    
  mdb.setMeta('url', item.url);
  mdb.setMeta('title', item.name);
  mdb.setMeta('headline', item.name); 
  mdb.setMeta('current', 'posts');
  
  res.send(item.html);
});





app.listen(config.port);
console.log('listen on %s:%d', config.host, config.port);