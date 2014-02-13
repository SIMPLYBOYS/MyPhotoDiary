var app = app || {};

app.PhotoCardView = Backbone.View.extend({
   className: 'card fade-in',

   template: _.template('<% if (typeof(date)==="undefined") { %><a href=<%= picPath %> <% } %><div class="card-image"><img alt=<%= author %> src=<%= picPath %> </a><% if(message!=="") {%><div class=banner></div><h5><%= message%></h5><%}%></div> <p id="time-stamp"><%=year %>-<%= month %>-<%= day %></p>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
