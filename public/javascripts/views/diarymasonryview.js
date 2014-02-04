var app = app || {};

app.DiaryMasonryView = Backbone.View.extend({
  el: '#container',

  events:{
    //TODO
  },

  initialize: function(){
     //this.collection = new app.Diary();
    //this.collection.on('reset', this.render, this); 
    this.listenTo(this.collection, 'reset', this.addAll);
    /*content = $('.container');
    this.layoutColumns();
    $(window).resize(this.onResize);
    //this.collection.fetch({reset: true});*/
    
  }, 
  addOne: function(photo){
    console.log('addOne\n');
    var photomasonryView = new app.PhotoMasonryView({model: photo});
    this.$el.append(photomasonryView.render().el);
  },
  addAll: function(){
    /*content = $('.container');
    this.layoutColumns();
    $(window).resize(this.onResize);*/
    //alert('$(document).width:' + $(document).width());

    //alert('DiaryListView render!' + this.collection.yearShow2014().length);
    $('.badge').html(this.collection.yearShow2014().length + this.collection.yearShow2013().length);
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
    var $container = $('#container').masonry();
    
    //----------------------------------------------------
    /*$container.imagesLoaded(function(){
       $container.masonry({
         itemSelector: '.picbox',
         columnWidth: 300
       });
    });

    $container.infinitescroll({
      navSelector: '#page-nav',
      nextSelector: '#page-nav a',
      itemSelector: '.picbox',
      loading: {
        finishedMsg: 'No more pages to load.',
        img: 'http://i.imgur.com/6RMhx.gif'
       }
      },
      function(newElements){
       alert('Testing!');
        var $newElems = $(newElements);
        $newElems.imagesLoaded(function(){
         $container.masonry('appended', $newElems, true);
        });
      }
    );*/

    // -----------------------------------------------------
    
    
    
    $container.masonry('bindResize');
    $container.imagesLoaded().done(function(instance){
      $container.masonry({
          itemSelect: '.picbox .demobox',
          columnWidth: 300,
          isAnimated: true,
          isFitWidth: true,
          animate: true
        });
    }).progress(function( instance, image){
      var result = image.isLoaded ? 'loaded' : 'broken';
      //console.log('images is ' + result + ' for ' + image.img.src);
    });

    /*setInterval(function(){
      alert('test setTimeout');
    },500);*/


    // --------------------------------------------- work around 
    /*setTimeout(function(){
      var $container = $('#container').masonry();
      $container.imagesLoaded(function(){
         $container.masonry({
          itemSelect: '.picbox .demobox',
          columnWidth: 300,
          isAnimated: true,
          animate: true
        });
      }); 
    },500);*/
  }
});
