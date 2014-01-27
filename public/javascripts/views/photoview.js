var app = app || {};

app.PhotoView = Backbone.View.extend({
   //className: 'col-xs-7 col-md-3 col-sm-4 col-lg-3',
   className: 'card',

template: _.template('<!--<h5></h5>--><div class="card-image"><a href=<%= picPath %> data-lightbox=<%= _id %> ><img data-src="holder.js/100%x180" alt=<%= author %> style="height: 180px; width: 100%; display:block;" src=<%= picPath %> </a><% if(title!=="") {%><h5><%= title%></h5><%}%></div><% if(message!=="") {%><p><%= message %></p><%}%>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     //console.log(attributes);
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
