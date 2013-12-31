var app = app || {};

app.PhotoView = Backbone.View.extend({
   className: 'col-xs-6 col-md-3',

   template: _.template('<a href=<%= picPath %> class="thumbnail"><img data-src="holder.js/100%x180" alt=<%= author %> style="height: 180px; width: 100%; display:block;" src=<%= picPath %> </a>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});