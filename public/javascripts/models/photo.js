var app = app || {};

app.Photo = Backbone.Model.extend({
       defaults: {
         author: 'aaron',
         message: 'hello myphoto diary',
         picPath: 'Unknown',
         releaseDate: '',
         year: '',
         month: '',
         day: ''
       },
       urlRoot: '/api/diaries',
       idAttribute: '_id'
});
