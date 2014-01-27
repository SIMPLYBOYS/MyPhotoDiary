var app = app || {},
    diaries_dom = [],
    detail_dom = [],
    num_2013,
    num_2014,
    yearPage,
    monthPage;
    

app.DiaryDetailView = Backbone.View.extend({
   tagName: 'div',
   className: 'row featurette',
  //el: '.col-xs-6.col-md-5.col-sm-5.col-lg-4',
 
  initialize: function(diary, y, m){
    yearPage = y.year;
    monthPage = m.month;
    //this.collection = new app.Diary();
    //this.collection.on('reset', this.render, this);  
    
    this.initdom();
    this.listenTo(this.collection, 'reset', this.addAll);
    this.listenTo(this.collection, 'all', this.addAll)
    //this.collection.fetch({reset: true});
  },
  initdom: function(){
     detail_dom = [];
     var col = $('<div class="col-xs-6 col-md-5 col-sm-5 col-lg-4">');
     detail_dom.push(col);
     col = $('<div class="col-xs-6 col-md-7 col-sm-7 col-lg-8">');
     detail_dom.push(col);
  },
  addOne: function(photo, index, list){
    //alert('DiaryDetailView.addOne');
    var photoDetailView = new app.PhotoDetailView({model: photo}),
        photoDataView = new app.PhotoDataView({model: photo});
    //this.$el.append(photoDetailView.render().el);
    detail_dom[0].append(photoDataView.render().el);
    detail_dom[1].append(photoDetailView.render().el);
    this.initdom(); 
    //console.log(detail_dom);
    diaries_dom.push(detail_dom);
    /*$('.photodetail').append(photoDetailView.render().el);
    $('.datadetail').append(photoDataView.render().el);*/
  },
  addAll: function(){
    //alert('DiaryDetailListView render!' + this.collection.yearShow2014().length);
    this.$el.empty();
    $('.photodetail').empty();
    $('.datadetail').empty();
    switch(yearPage) {
      case '2014':
        var year_group = this.collection.yearShow2014(monthPage);
        $('.badge').html(year_group.length);
        num_2014 = year_group.length;
        year_group.forEach(this.addOne, this);
        for(var i=0;i<num_2014;i++){
          $('.featurette').append(diaries_dom[i]);
        }
        break;
      case '2013':
        var year_group = this.collection.yearShow2013(); 
        num_2013 = year_group.length;
        //console.log('num of diares in 2013: ' + num_2013);
        $('.badge').html(num_2013);
        year_group.forEach(this.addOne, this);
        for(var i=0;i<num_2013;i++){
          $('.featurette').append(diaries_dom[i]);
        }
        //console.log(diaries_dom);
        break;
      default:
        alert('Not implement in DiaryDetailView');
        break;
    }
  }
});
