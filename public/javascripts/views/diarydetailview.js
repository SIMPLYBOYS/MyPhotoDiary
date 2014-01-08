var app = app || {},
    yearPage;

app.DiaryDetailView = Backbone.View.extend({
   tagName: 'div',
   className: 'row featurette',
  //el: '.col-xs-6.col-md-5.col-sm-5.col-lg-4',
 
  initialize: function(diary, y){
    yearPage = y.year;
    //this.collection = new app.Diary();
    //this.collection.on('reset', this.render, this); 
    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'all', this.addAll)
    //this.collection.fetch({reset: true});
  },
  addOne: function(photo){
    //alert('DiaryDetailView.addOne');
    var photoDetailView = new app.PhotoDetailView({model: photo}),
        photoDataView = new app.PhotoDataView({model: photo});
    //this.$el.append(photoDetailView.render().el);
    $('.photodetail').append(photoDetailView.render().el);
    $('.datadetail').append(photoDataView.render().el);
  },
  addAll: function(){
    //alert('DiaryDetailListView render!' + this.collection.yearShow2014().length);
    this.$el.empty();
    $('.photodetail').empty();
    $('.datadetail').empty();
    switch(yearPage) {
      case '2014':
        var year_group = this.collection.yearShow2014();
        year_group.forEach(this.addOne, this);
        break;
      case '2013':
        var year_group = this.collection.yearShow2013();
        year_group.forEach(this.addOne, this);
        break;
      default:
        alert('Not implement in DiaryDetailView');
        break;
    }
  }
});
