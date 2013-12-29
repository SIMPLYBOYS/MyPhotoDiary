var app = app || {};

app.Photo = Backbone.Model.extend({
       defaults: {
         author: 'aaron_chou',
         message: 'hello myphoto diary',
         picPath: 'Unknown',
         releaseDate: '2013/12/29'
       },
       
       idAttribute: '_id'
});
