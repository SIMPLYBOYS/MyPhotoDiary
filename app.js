
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
      fs = require('fs'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 4711);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about', function(req, res){
  res.render('about.jade', {title: 'About'});
});
app.get('/images', function(req, res){
  console.log('images info get request!\n');
  res.end();
});
app.post('/images', function(req, res){
  console.log('images upload function is constructing!\n');
  //console.log(req.body.image);
  //console.log(req.body.fileName);
  var base64Data = req.body.image,
        fileName = req.body.fileName + '.png',
         tmpPath = req.body.path + '/' + fileName,
      targetPath = './uploads/' + fileName,
      binaryData = new Buffer(base64Data, 'base64').toString('binary');
  console.log('--------------\n\n');
  //console.log(tmpPath);
  fs.writeFile(fileName, binaryData, 'binary', function(err, written, buffer){
    console.log(err);
    if(!err){
      fs.rename(tmpPath, targetPath, function(err){
        if(err) throw err;
        fs.unlink(tmpPath, function(){
         if (err) throw err;
         console.log('----- finished upload ----\n\n');
         //TODO DB save operation
        })
      });
    } else {
        throw err;
    }  
  });
  
  //console.log(binaryData);
  
  //console.log(req.file);
  //res.send(data);
  res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
