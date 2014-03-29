var app = app || {};

define([
  'underscore',
  'backbone'
],function(_, Backbone){
    app.Photo = Backbone.Model.extend({
       defaults: {
         author: 'aaron',
         message: 'hello myphoto diary',
         picPath: 'Unknown',
         releaseDate: '',
         year: '',
         month: '',
         day: '',
         title: ''
       },
       urlRoot: '/api/diaries',
       idAttribute: '_id'
    });
});

/*app.Photo = Backbone.Model.extend({
       defaults: {
         author: 'aaron', 
         message: 'hello myphoto diary',
         picPath: 'Unknown',
         releaseDate: '',
         year: '',
         month: '',
         day: '',
         title: ''
       },
       urlRoot: '/api/diaries',
       idAttribute: '_id'
});*/
