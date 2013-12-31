var app = app || {};

var PhotoDiaryApp = new (Backbone.Router.extend({
  routes: {
              '' : 'index',    
           'demo': 'demo',
           'diaries/p:id': 'show',
           'file/*path': 'file'
           //'*path': 'notFound'
  },
  file: function(path){
    alert('file');
    var parts = path.split('/');
    console.log(parts);
  },
  notFound: function(path){
    alert('Sorry! There is no content here!.');
  },
  initialize: function(){
    this.DemoDiary = new app.Diary();
  }, 
  start: function(){
    //alert('history.start!');
    Backbone.history.start({pushState: true});
  },
  index: function(){
    //alert("index router !!");
    this.Diary.fetch();
    this.DiaryView = new app.DiaryView({collection: this.Diary});
    $('.row.demo').append(this.DiaryView.el);
  },
  demo: function(){
    //alert('demo!');
    var  DemoDiaryView = new app.DiaryView({collection: this.DemoDiary});
    this.DemoDiary.fetch({reset: true});
    $('.row.demo').append(DemoDiaryView.el);   
  },
  show: function(id){
    alert('router works  !!');
    console.log(id);
  }
}));
