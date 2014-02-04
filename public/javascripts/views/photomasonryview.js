var app = app || {};

app.PhotoMasonryView = Backbone.View.extend({
   className: 'picbox',

   template: _.template('<a href=<%= picPath %><% if(message!=="") {%> title=<%= message%> <%}%> data-lightbox=<%= _id %> ><img src=<%= picPath %>>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
