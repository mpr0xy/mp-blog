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
app.use(morgan('short'));


// loading widget



// default route
app.get('/', function(req, res){
  var articles = mdb.getArticles()
  var widget = mdb.getWidget()
  res.render('home', {
    articles: articles.slice(0, config.pages),
    widget: widget,
    contentType: 'all',
    contentName: 'all',
    cdn: config.cdn
  })
});


// projects route
app.get(/project.?/, function(req, res){
  res.render('projects')
});


// scroll-pagination
app.get('/scrollpage/:type/:name/:pageid', function(req, res){
  var articles
  var pageid = parseInt(req.params.pageid)
  var type = req.params.type
  var name = req.params.name

  if (type === 'all'){
    articles = mdb.getArticles()
  }
  if (type === 'category'){
    articles = mdb.getArticles(type, name)
  }
  if (type === 'tags'){
    articles = mdb.getArticles(type, name)
  }

  res.json({
    articles: articles.slice(pageid * config.pages, pageid * config.pages + config.pages)
  })
})


/**
  * Display category post
  * @example http://xxx.com/category/front
 **/
app.get('/category/:categoryName', function(req, res){
  var categoryName = req.params.categoryName
  var widget = mdb.getWidget()
  var articles = mdb.getArticles('category', categoryName)
  res.render('home', {
    articles: articles.slice(0, config.pages),
    widget: widget,
    contentType: 'category',
    contentName: categoryName,
    cdn: config.cdn
  })
})


/**
  * Display tags post
  * @example http://xxx.com/tags/javascript
 **/
app.get('/tags/:tagName', function(req, res){
  var tagName = req.params.tagName
  var widget = mdb.getWidget()
  var articles = mdb.getArticles('tags', tagName)

  res.render('home', {
    articles: articles.slice(0, config.pages),
    widget: widget,
    contentType: 'tags',
    contentName: tagName,
    cdn: config.cdn
  })
})


/**
 * response article name from id
 * @examle http://xxx.com/article-name/1001
 **/
app.get('/articlebeforandnext/:id', function(req, res){
  var id = Number(req.params.id)
  var before = mdb.getArticle(id - 1)
  var next = mdb.getArticle(id + 1)
  var empty = {
        filename: '',
        name: ''
      }
  if (!before){
    before = empty
  }
  if (!next){
    next = empty
  }
  res.json({
    before: {
      filename: before.filename,
      name: before.name
    },
    next: {
      filename: next.filename,
      name: next.name
    }
  })
});


/**
 * Display single blog post
 * @example http://xxx.com/markdown-guide-3158.html
 **/
app.get(/([A-Za-z0-9\(\)\-]+)(\.html)?/, function(req, res) {
  
  // console.log(req.params[0]);
  var widget = mdb.getWidget()
  var item = mdb.getArticle(req.params[0]);
  if (!item) {
    res.end('not found')
  }
  else{
    res.render('article', {
      article: item, 
      widget: widget,
      cdn: config.cdn
    });  
  }
});







app.listen(config.port);
console.log('listen on %s:%d', config.host, config.port);