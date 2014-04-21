var app = app || {},
    diaries_dom = [],
    detail_dom = [],
    Diarypath = "";
    
app.DiaryPerDayView = Backbone.View.extend({
   tagName: 'div',
   className: 'row featurette',
  //el: '.col-xs-6.col-md-5.col-sm-5.col-lg-4',
 
  initialize: function(diary, path){
    Diarypath = path; 
    //alert('init: ' + JSON.stringify(Diarypath));
    console.log('-------->' + Diarypath.id);
    this.initdom();
    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'all', this.addAll)
    //this.collection.fetch({reset: true});
  },
  initdom: function(){
     detail_dom = [];
     var col = $('<div class="col-xs-4 col-md-4 col-sm-5 col-lg-4">');
     detail_dom.push(col);
     col = $('<div class="col-xs-8 col-md-8 col-sm-7 col-lg-8">');
     detail_dom.push(col);
  },
  addOne: function(photo, index, list){
    //alert('DiaryDetailView.addOne');
    var photoDetailView = new app.PhotoDetailView({model: photo}),
        photoDataView = new app.PhotoDataView({model: photo});
    //this.$el.append(photoDetailView.render().el);
    detail_dom[0].append(photoDataView.render().el);
    detail_dom[1].append(photoDetailView.render().el);
    diaries_dom.push(detail_dom);
    this.initdom(); 
  },
  addAll: function(){
    //alert('DiaryDetailListView render!' + this.collection.yearShow2014().length);
    this.$el.empty();
    $('.photodetail').empty();
    $('.datadetail').empty();
    var diary_group = this.collection.where({picPath: '/uploads/' + Diarypath.id});
    diary_group.forEach(this.addOne, this);
    console.log('diary_group: ' + JSON.stringify(diary_group));
    
    $('.featurette').append(diaries_dom[1]);
    //alert('test diary per day length: ' + diary_group.length);
  }
});
