/**
 * Module dependencies.
 */
var express = require('express');
var lessMiddleware = require('less-middleware');
var morgan  = require('morgan');

/**
 * Load config JSON file
 **/
var config = JSON.parse(require('fs').readFileSync(__dirname + '/config.json','utf8'));

var app = express();

// app setting view engine
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// app use middleware
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(morgan());



// default route
app.get('/', function(req, res){
  res.render('home');
});





// if this blog in the BAE(baidu app engine). reset host and port
var is_BAE = process.env.BAE_ENV_APPID ? true : false
if (is_BAE){
  config.host = 'whyexploit.duapp.com';
  config.port = 18080;
}
app.listen(config.port);
console.log('listen on %s:%d', config.host, config.port);