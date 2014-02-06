var app = app || {},
    elems = [];


app.DiaryMasonryView = Backbone.View.extend({
  el: '#container',

  events:{
    //TODO
  },

  initialize: function(){
     //this.collection = new app.Diary();
    //this.collection.on('reset', this.render, this); 
    _.bindAll(this, 'addAll', 'addOne', 'appendOne', 'appendView');

    this.listenTo(this.collection, 'reset', this.addAll);
    this.infiniScroll = new Backbone.InfiniScroll(this.collection, {success: this.appendView, onFetch: function(){ console.log('onFetch!!'); }, pageSize: 6, scrollOffset: 100, includePage: true});
    this.infiniScroll.resetScroll();
    var p = this.collection.fetch({reset: true});
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

     //alert('length of collection: '+ this.collection.length);

    /*content = $('.container');
    this.layoutColumns();
    $(window).resize(this.onResize);*/
    //alert('$(document).width:' + $(document).width());

    //alert('DiaryListView render!' + this.collection.yearShow2014().length);

    /*$('.badge').html(this.collection.yearShow2014().length + this.collection.yearShow2013().length);*/
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
  },
  appendView: function(collection, response){
   //alert(JSON.stringify(response[0]));
   //_.each(response, this.addOne, this);
   //response.forEach(this.addOne, this);
   var $container = $('#container').masonry({itemSelect: '.picbox .demobox',
          columnWidth: 300,
          isAnimated: true,
          animate: true
        }),
        appendlist;

   appendlist = _.map(response, function(listconfig){
     //console.log(listconfig);
     return new app.Photo(listconfig); 
   });
   //alert(JSON.stringify(response));
   appendlist.forEach(this.appendOne, this);
   $container.append(elems).masonry('appended', elems); 
   elems.splice(0,elems.length); 
   console.log('response.length: ' + response.length + '\ncollection.length: ' + collection.length + '\nelems: ' + elems.length);
  },
  appendOne: function(photo){
    var photomasonryView = new app.PhotoMasonryView({model: photo});
    elems.push(photomasonryView.render().el);
  }
});
