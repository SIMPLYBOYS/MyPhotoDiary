var app = app || {};

app.PhotoCardView = Backbone.View.extend({
   className: 'card card-image',

   template: _.template('<% if (s3!==true) { %><a class="iframe" href="/diary_per_day<%= picPath %>/s3/false" <% } else { %> <a class="iframe" href="/diary_per_day/uploads/<%= picPath.split("/")[4] %>/s3/<%= s3 %>" <%}%> <div class="card-image fade-in"><img alt=<%= author %> src=<%= picPath %> > <% if(title!=="") {%><div class=mybanner></div><h5><%= title%></h5><%}%></div></a><div class=info_wrapper> <% if(message!=="") {%> <p><%= message %></p> <%}%> <div class="info_box pull-left" id="time-stamp"><%=year %>-<%= month %>-<%= day %></div> <div class="info_box pull-right"><a class="fa fa-github-square" style="top: -3px;"></a> <a class="fa fa-facebook-square" style="top: -3px;"></a> <a class="fa fa-google-plus-square" style="top: -3px;"></a></div>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
