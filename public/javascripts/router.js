var app = app || {}

define(['jquery',
	'underscore',
	'backbone',
        'models/photo',
        'collections/diary',
        'collections/masonry_diary',
        'views/diarycardview',
        'masonry',
        'infiniscroll',
        'bootstrap'
],function($, _, Backbone){

	var AppRouter = Backbone.Router.extend({
            routes: {
              '': 'index',
             'demo': 'demo',
             'about': 'about',
             'diaries/:year/:month/:id': 'detail_diary_year',
             'diary_per_day/uploads/:path': 'diary_per_day',
             'file/*path': 'file',
             'contact': 'contact',
             'others': 'other_demo',
             'year/:y': 'year_diary',
             'cardui_3': 'cardui_3',
             'masonry': 'masonry'
           },
           index: function(){
	     console.log('--- index ---');
	     $('#diary_num').hide();
           },
           start: function(){
	     console.log('--- start ---');
	     Backbone.history.start({pushState: true});
           },
           initialize: function(){
              console.log('--- initialiize ---');
              this.DemoDiary = new app.Diary(app.Photo);
              this.MasonryDiary = new app.MasonryDiary(app.Photo);
              this.route('/cardui_3', "cardui_3");
           },
           about: function(){
              console.log('--- about ---');
              $('#diary_num').hide();
           },
           contact: function(){
              $('#diary_num').hide();
           },
           cardui_3: function(){
              //app.AppRouter.navigate('cardui_3', {trigger: true});
              $('#diary_num').hide();
              console.log('cardui_3');
              var DemoDiaryCardView = new app.DiaryCardView({collection: this.MasonryDiary});
           } 
        });

        var initialize = function(){
	   app.AppRouter = new AppRouter();
           app.AppRouter.start();
           //app.AppRouter.navigate('cardui_3', {trigger: true});
        };
	
	return{
  		initialize: initialize
        };
});
