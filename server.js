
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
      fs = require('fs'),
  mongoose = require('mongoose'),
    path = require('path');

mongoose.connect('mongodb://localhost/diary_database');

var app = express();

//Schemas
var Diary = new mongoose.Schema({
    author: String,
    message: String,
    releaseDate: Date,
    picPath: String,    
});

var DiaryModel = mongoose.model('Diary', Diary);

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
app.get('/demo', function(req, res){
  res.render('demo.jade', {title: 'PhotoDiary Demom'})
});
app.get('/contact', function(req, res){
  res.render('hello.jade', {title: 'Contact Us'});
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
      targetPath = './public/uploads/' + fileName,
         picDate = new Date(),
         message = '',
           diary = new DiaryModel({
              //author: req.body.author,
              author: 'aaron',
             message: '',
             releaseDate: picDate,
             picPath: '/uploads/' + fileName,
          });
      binaryData = new Buffer(base64Data, 'base64').toString('binary');
  console.log('-------saved to database -------\n\n');
  diary.save(function(err){
    if(!err){
      console.log('created!')
    } else {
      return console.log('err in created diary process!');
    }
    res.end();
  });
  
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
  
  /*console.log(binaryData); 
  console.log(req.file);
  res.send(data);*/
  res.end();
});

app.put('/api/diaries/:id', function(req, res){
  console.log('Update Diary: ' + req.params.id);
  return DiaryModel.findById(req.params.id, function(err, pics){
    pics.releaseDate = req.body.releaseDate;
    //console.log(pics);  
    return pics.save(function(err){
      if(!err){
        console.log('diary update!');
      } else {
        console.log(err);
      }
    });
  });
});

app.get('/api/diaries', function(req, res){
  return DiaryModel.find(function(err, diaries){
    if(!err){
      console.log(diaries);
      return res.send(diaries);
    } else {
      return console.log(err);
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
