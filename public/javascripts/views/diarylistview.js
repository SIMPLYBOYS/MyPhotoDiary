var app = app || {};

app.DiaryListView = Backbone.View.extend({
  el: '.row.demo',

  events:{
    //TODO
  },

  initialize: function(){
     //this.collection = new app.Diary();
    //this.collection.on('reset', this.render, this); 
    this.listenTo(this.collection, 'reset', this.addAll);
    //this.collection.fetch({reset: true});
  },
  addOne: function(photo){
    var photoView = new app.PhotoView({model: photo});
    this.$el.append(photoView.render().el);
  },
  addAll: function(){
    //alert('DiaryListView render!' + this.collection.yearShow2014().length);
    $('.badge').html(this.collection.yearShow2014().length + this.collection.yearShow2013().length);
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  }
});
