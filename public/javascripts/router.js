var app = app || {};

var PhotoDiaryApp = new (Backbone.Router.extend({
  routes: {"demo": "index",
           "diaries/:id": "show"
  },
  initialize: function(){
    this.Diary = new app.Diary();
    this.DiaryView = new app.DiaryView({collection: this.Diary});
    $('.row.demo').append(this.DiaryView.el); 
  }, 
  start: function(){
    Backbone.history.start({pushState: true});
  },
  index: function(){
   //alert("router works  !!");
   this.Diary.fetch();
  },
  show: function(id){
    console.log('id');
  }
}));
