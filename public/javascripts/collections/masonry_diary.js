var app = app || {};
define([
  'underscore',
  'backbone',
  'models/photo'
], function(_, Backbone){
    app.MasonryDiary = Backbone.Collection.extend({
      model: app.Photo,
        url: '/api/masonry_diaries',
      comparator: function(item1, item2){
        return item1.get('year') < item2.get('year');
      },
      parse: function(res){
        return res;
      }
    });
});
