var app = app || {};

app.PhotoDetailView = Backbone.View.extend({
   tagName: 'div',
   className: 'aaron',
   //className: 'col-xs-6 col-md-7 col-sm-7 col-lg-8',

   template: _.template('<img src=<%= picPath %> alt="Generic placeholder image" class="featurette-image img-responsive"><br><br><br>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     //console.log('--- PhotoDetailView---\n\n');
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
