var app = app || {};

var PhotoDiaryApp = new (Backbone.Router.extend({
  routes: {
              '' : 'index',    
           'demo': 'demo',
           'about': 'about',
           'diaries/:year/:month/:id': 'detail_diary_year',
           'file/*path': 'file',
           'contact': 'contact',
           'others': 'other_demo',
           'year/:y': 'year_diary',
           'cardui_3': 'cardui_demo',
           'masonry': 'masonry',
           'diary_per_day/uploads/:id/s3/:state': 'diary_per_day'
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
    this.DemoDiary = new app.Diary(app.Photo); 
    this.MasonryDiary = new app.MasonryDiary(app.Photo);
  }, 
  start: function(){
    //alert('history.start!');
    Backbone.history.start({pushState: true});
  },
  index: function(){
    $('#diary_num').hide();
    //alert("index router !!" + this.DemoDiary.length);
    /*this.Diary.fetch();
    this.DiaryView = new app.DiaryView({collection: this.Diary});
    $('.row.demo').append(this.DiaryView.el);*/
  },
  about: function(){
    $('#diary_num').hide();
  },
  demo: function(){
    //alert('demo!');
    var  DemoDiaryListView = new app.DiaryListView({collection: this.DemoDiary});
    this.DemoDiary.fetch({reset: true}); 
    /*this.DemoDiary.fetch();
    this.DemoDiary.trigger('reset');*/
    //alert(this.DemoDiary.authorCount());
    //$('.row.demo').append(DemoDiaryListView.el);   
  },
  diary_per_day: function(id, state){
    var DiaryPerDayView = new app.DiaryPerDayView({collection: this.DemoDiary}, {id: id}, {state: state});
    this.DemoDiary.fetch({reset: true});
  },
  masonry: function(){
    $('#diary_num').hide();
    var DiaryMansonryView = new app.DiaryMasonryView({collection: this.MasonryDiary});
  },
  cardui_demo: function(){
    $('#diary_num').hide();
    var DemoDiaryCardView = new app.DiaryCardView({collection: this.MasonryDiary});
    //var DemoDiaryCardView = new app.DiaryCardView({collection: this.MasonryDiary}); 
    //$('.container').append(DemoDiaryCardView.el);
    //$('row.demo').append(DemoDiaryCardView.el);
    //alert('width of the window: '+$(document).width());
  },
  contact: function(){
    $('#diary_num').hide();
    var $elem = $('.btn-primary');
    document.documentElement.requestFullscreen =
            document.documentElement.requestFullscreen ||
            document.documentElement.mozRequestFullScreen ||
            document.documentElement.webkitRequestFullscreen;
   
    document.cancelFullScreen =
            document.cancelFullScreen ||
            document.mozCancelFullScreen ||
            document.webkitCancelFullScreen;

    fullscreen = function(){
       if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
         document.documentElement.requestFullscreen();
       } else {
         document.cancelFullScreen();
       }
    };
    $elem.on('click', fullscreen);
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
  detail_diary_year: function(year, month, id){
    console.log('month: ' + month);
    switch (year){
      case '2014':
        //alert('router works  !!' + year + year + month + id);
        var diaryDetailView = new app.DiaryDetailView({collection: this.DemoDiary},{year: '2014'}, {month: month});
        this.DemoDiary.fetch({reset: true});
        console.log(id);
        break;
      case '2013':
        var diaryDetailView = new app.DiaryDetailView({collection: this.DemoDiary},{year: '2013'}, {month: month});
        this.DemoDiary.fetch({reset: true});
        break;
      default:
        alert('not in DB!');
        break; 
    }
  }
}));
