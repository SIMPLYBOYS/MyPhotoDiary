var app = app || {},
    columns = 4,
    columns_dom = [];

app.DiaryListView = Backbone.View.extend({
  el: '.row.demo',

  events:{
    //TODO
  },

  initialize: function(){
     //this.collection = new app.Diary();
    //this.collection.on('reset', this.render, this); 
    this.listenTo(this.collection, 'reset', this.addAll);
    for(var i=0; i< 4; i++){
      var col = $('<div class="col-xs-5 col-md-4 col-sm-4 col-lg-3">');
      columns_dom.push(col);
    }
    //this.collection.fetch({reset: true});
  },
  addOne: function(photo, index, list){
    //alert('index: ' + index);
    var targetColumn = index % 4;
    var photoView = new app.PhotoView({model: photo});
    //this.$el.append(photoView.render().el);
    columns_dom[targetColumn].append(photoView.render().el);
    //alert(columns_dom);
  },
  addAll: function(){
    //alert('windows: ' + columns);
    //alert('DiaryListView render!' + this.collection.yearShow2014().length);
    $('.badge').html(this.collection.yearShow2014().length + this.collection.yearShow2013().length);
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
    this.$el.append(columns_dom);
    //alert(JSON.stringify(columns_dom[0])); }
   }
});
