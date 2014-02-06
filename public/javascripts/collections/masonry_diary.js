var app = app || {};

app.MasonryDiary = Backbone.Collection.extend({
  model: app.Photo,
    url: '/api/masonry_diaries',
    //url: '/year/2014',
  //comparator: 'year',
  comparator: function(item1, item2){
    return item1.get('year') < item2.get('year');
  },
  
  parse: function(res){
    return res;
  }
});
