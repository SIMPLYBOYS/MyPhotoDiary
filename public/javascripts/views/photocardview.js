var app = app || {};

app.PhotoCardView = Backbone.View.extend({
   className: 'card',

   template: _.template('<% if (typeof(date)==="undefined") { %><a href=<%= picPath %>  data-lightbox=<%= _id %> <% } %><div class="card-image fade-in"><img alt=<%= author %> src=<%= picPath %> > <% if(title!=="") {%><div class=banner></div><h5><%= title%></h5><%}%></div> </a> <div class=info_wrapper> <% if(message!=="") {%> <p><%= message %></p> <%}%> <a class="info_box" id="time-stamp"><%=year %>-<%= month %>-<%= day %></a><a class="info_box pull-right"><span class="glyphicon glyphicon-thumbs-up" style="top: -3px;"></span></a></div>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
