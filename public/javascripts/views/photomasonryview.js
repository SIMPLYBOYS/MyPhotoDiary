var app = app || {};

app.PhotoMasonryView = Backbone.View.extend({
   className: 'picbox',

   template: _.template('<a href=<%= picPath %> <div class="group_masonry"><img class="fade-in" src=<%= picPath %> id=<%= _id %>> </a>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
