var app = app || {};

app.PhotoListView = Backbone.View.extend({
   className: 'col-xs-7 col-md-3 col-sm-4 col-lg-3',

   template: _.template('<a href=<%= picPath %> data-lightbox=<%= _id %> class="thumbnail"><img data-src="holder.js/100%x180" alt=<%= author %> style="height: 180px; width: 100%; display:block;" src=<%= picPath %> </a>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     //console.log(attributes);
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
