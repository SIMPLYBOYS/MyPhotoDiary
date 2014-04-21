
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
    title: String,
    message: String,
    releaseDate: Date,
    picPath: String, 
    year: String,
    month: String,
    day: String  
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
app.get('/cardui', function(req, res){
  res.render('cardui.jade', {title: 'Badic CardUI Demo'});
});
/*app.get('/cardui_2', function(req, res){
  res.render('cardui_2.jade', {title: 'Fix Colume CardUI Demo'});
});*/
app.get('/cardui_3', function(req, res){
  res.render('cardui_3.jade', {title: 'Formal version of CardUI Demo'});
});
app.get('/masonry', function(req, res){
  res.render('masonry.jade', {title: 'RealWorld CardUI Demo'});
});
app.get('/year/:y', function(req, res){
  res.render('demo.jade', {title: 'PhotoDiary per Year'})
});
app.get('/others/:id', function(req, res){
  console.log('other demos:' + req.params.id);
  res.render('others.jade', {title: 'Other Demos:' + req.params.id});
});
app.get('/contact', function(req, res){
  res.render('contact.jade', {title: 'Contact Us'});
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
            year = picDate.getFullYear(),
           month = picDate.getMonth() + 1 ,
             day = picDate.getDate()
         message = '',
           binaryData = new Buffer(base64Data, 'base64').toString('binary')
           diary = new DiaryModel({
              //author: req.body.author,
              author: 'aaron',
             message: '',
             releaseDate: picDate,
             picPath: '/uploads/' + fileName,
                year: year,
               month: month,
                 day: day
          });
      //binaryData = new Buffer(base64Data, 'base64').toString('binary');
  console.log('-------saved to database -------\n\n');
  diary.save(function(err){
    if(!err){
      console.log('created!')
    } else {
      return console.log('error in created diary process!');
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

app.get('/diaries/:year/:month/:day', function(req, res){
  console.log('diary detail: ' + req.params.year + '/' + req.params.month + '/' + req.params.day);
  res.render('diary_detail.jade', {title: 'Diary Detail View'}); 
});

app.get('/api/diaries/:id', function(req, res){
  //console.log('\n----------\n' + req.params.id);
  return DiaryModel.findById(req.params.id, function(err, diary){
     if(!err)
       return res.send(diary);
     else {
       console.log('error occur maybe this id does\'nt in the database\n');
       return null;
     } 
  });
});

app.get('/testapi', function(req, res){
  console.log('----- testing api -----\n');
  res.redirect('/cardui_3');
  /*return DiaryModel.find({year: '2013', day: '31'}, function(err, pic){
    if(!err)
      return res.send(pic);
  });*/
  //db.diaries.find({$and: [{year: '2013'}, {day: '31'}]})  
});

app.put('/api/diaries/:id', function(req, res){
  console.log('Update Diary: ' + req.params.id + JSON.stringify(req.body));
  return DiaryModel.findById(req.params.id, function(err, pic){
    pic.releaseDate = req.body.releaseDate;
    pic.message = req.body.message;
    pic.title = req.body.title;
    //console.log(pics);  
    return pic.save(function(err){
      if(!err){
        console.log('diary update!');
      } else {
        console.log(err);
      }
    });
  });
});

app.delete('/api/diaries/:id', function(req, res){
  console.log('Delete Diary: ' + req.params.id);
  return DiaryModel.findById(req.params.id, function(err, pic){
   return pic.remove(function(err){
     if(!err){
       console.log('a Picture of Diary has been removed!');
     } else {
       console.log(err);
     }
   });
  });
});

app.get('/api/diaries', function(req, res){
   DiaryModel.find({}).sort('-releaseDate').exec(function(err, diaries){
      if(!err){
        console.log(diaries);
        return res.send(diaries);
      } else {
        return console.log(err);
      }
    });
});

app.get('/api/masonry_diaries', function(req, res){
  console.log('page_size: ' + req.param('page_size') + '\npage:' + req.param('page'));
  var page_size = req.param('page_size'),
      page = req.param('page'),
      totalPages,
      skipForm = (page*page_size) - page_size; 


  if(page_size === undefined){
     page_size = 12;
     page = 1;
     skipFrom = 0; 
  } else {  
    skipFrom = (page*page_size) - page_size + 12;
    console.log(skipFrom);
  }
  
  //console.log('============== page_size:' + req.param('page_size') + '==============');
  /*DiaryModel.find().sort('-releaseDate').exec(function(err, diaries){
    if(!err){
      console.log(diaries);
      //console.log('--------- 20140105------\n')
      return res.send(diaries);
    } else {
      return console.log(err);
    }
  });*/

  var query = DiaryModel.find({}).skip(skipFrom).limit(page_size).sort('-releaseDate');

  query.exec(function(error, diaries){
    if(error){
      console.log('error');
    } else {
      return res.send(diaries);
    }
  }); 
  

  /*DiaryModel.find({},function(err, diaries){
    if(!err){
      console.log(diaries);
      return res.send(diaries);
    } else {
      return console.log(err);
    }
  })*/
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
