var app = app || {};

app.DiaryView = Backbone.View.extend({
  el: '.row.demo',

  events:{
    //TODO
  },

  initialize: function(){
    this.collection = new app.Diary();
    
    this.listenTo(this.collection, 'reset', this.render);
    this.collection.fetch({reset: true});
  },
  addOne: function(photo){
    var photoView = new app.PhotoView({model: photo});
    this.$el.append(photoView.render().el);
  },
  render: function(){
    this.collection.forEach(this.addOne, this);
  }
});
