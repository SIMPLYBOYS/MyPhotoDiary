var app = app || {};

app.Diary = Backbone.Collection.extend({
  model: app.Photo,
    url: '/api/diaries',
    //url: '/year/2014',
  //comparator: 'year',
  comparator: function(item1, item2){
    return item1.get('year') < item2.get('year');
  },
  
  parse: function(res){
    //alert(JSON.stringify(res));
    //return this.where({year: '2014'});
    /*var sort = _.where(res, {year: '2014'});
    return sort;*/
    return res;
  },

  authorCount: function(){
    return this.where({author: 'aaron'}).length;
  },

  dateCount: function(){
    return this.where({year: '2014'}).length;
  },

  yearShow2014: function(){
    return this.where({year: '2014'});
  },

  yearShow2013: function(){
    return this.where({year: '2013'});
  }
});
