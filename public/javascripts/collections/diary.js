var app = app || {};

app.Diary = Backbone.Collection.extend({
  model: app.Photo,
    url: '/api/diaries'
});
