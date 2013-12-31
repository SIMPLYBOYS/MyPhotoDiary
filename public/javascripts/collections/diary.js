var app = app || {};

app.Diary = Backbone.Collection.extend({
  model: app.Photo,
    url: '/api/diaries',
  comparator: 'year',
  
  parse: function(res){
    //alert(JSON.stringify(res));
    return res;
  },

  authorCount: function(){
    return this.where({author: 'aaron'}).length;
  },

  dateCount: function(){
    return this.where({year: '2013'});
  }
});
