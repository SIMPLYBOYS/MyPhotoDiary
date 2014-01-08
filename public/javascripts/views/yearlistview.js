var app = app || {},
    yearPage;
    

app.DiaryYearListView = Backbone.View.extend({
  el: '.row.demo',

  events:{
    //TODO
  },

  initialize: function(diary,y){
    //alert('DiaryYear: ' + y.year);
    yearPage = y.year;
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
    this.$el.empty();
    switch(yearPage) {
      case '2014':
        //alert('2014');
        var year = this.collection.yearShow2014();
        console.log(year.length);
        year.forEach(this.addOne, this);
        break;
      case '2013': 
        //alert('2013');
        var year = this.collection.yearShow2013();
        console.log(year.length);
        year.forEach(this.addOne, this);  
        break;
      default:
        console.log('Not in DB');
        break;
    }
  }
});
