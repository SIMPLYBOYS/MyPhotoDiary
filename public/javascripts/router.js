var app = app || {};

var PhotoDiaryApp = new (Backbone.Router.extend({
  routes: {
              '' : 'index',    
           'demo': 'demo',
           'diaries/:year/:id': 'detail_diary_year',
           'file/*path': 'file',
           'others': 'other_demo',
           'year/:y': 'year_diary'
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
    //alert("index router !!" );
    /*this.Diary.fetch();
    this.DiaryView = new app.DiaryView({collection: this.Diary});
    $('.row.demo').append(this.DiaryView.el);*/
  },
  demo: function(){
    //alert('demo!');
    var  DemoDiaryListView = new app.DiaryListView({collection: this.DemoDiary});
    this.DemoDiary.fetch({reset: true}); 
    /*this.DemoDiary.fetch();
    this.DemoDiary.trigger('reset');*/
    //alert(this.DemoDiary.authorCount());
    $('.row.demo').append(DemoDiaryListView.el);   
  },
  other_demo: function(){
    alert('other demos!');
    /*var  DemoDiaryView = new app.DiaryView({collection: this.DemoDiary});
    this.DemoDiary.fetch({reset: true});
    $('.row.aaron').append(DemoDiaryView.el);*/
  },
  year_diary: function(y){
    switch (y) {
      case '2014':
        var yearDiaryView = new app.DiaryYearListView({collection: this.DemoDiary},{year: '2014'});
        this.DemoDiary.fetch({reset: true});
        break;
      case '2013':
        var yearDiaryView = new app.DiaryYearListView({collection: this.DemoDiary},{year: '2013'});
        this.DemoDiary.fetch({reset: true});
        break;
      //alert('2014 shown '+ y + this.DemoDiary.yearShow2014());
      default:
        console.log('not in DB!');
        break;
    }
  },
  detail_diary_year: function(year, id){
    switch (year){
      case '2014':
        //alert('router works  !!' + year + year + month + id);
        var diaryDetailView = new app.DiaryDetailView({collection: this.DemoDiary},{year: '2014'});
        this.DemoDiary.fetch({reset: true});
        console.log(id);
        break;
      case '2013':
        var diaryDetailView = new app.DiaryDetailView({collection: this.DemoDiary},{year: '2013'});
        this.DemoDiary.fetch({reset: true});
        break;
      default:
        alert('not in DB!');
        break; 
    }
  }
}));
