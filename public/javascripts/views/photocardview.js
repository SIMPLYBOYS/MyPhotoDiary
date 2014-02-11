var app = app || {};

app.PhotoCardView = Backbone.View.extend({
   className: 'card',

   template: _.template('<% if (typeof(date)==="undefined") { %><a href=<%= picPath %> class="thumbnail"><% } %><div class="card-image"><img data-src="holder.js/100%x200" alt=<%= author %> style="height: 200px; width: 100%; display:block;" src=<%= picPath %> </a><% if(message!=="") {%><div class=banner></div><h5><%= message%></h5><%}%></div><p><p>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
