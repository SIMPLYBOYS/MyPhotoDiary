var app = app || {},
    elems = [],
    notifElem,
    yearPage;

define([
 'jquery',
 'underscore',
 'backbone',
 'masonry',
 'infiniscroll',
 'scrollup',
 'views/photocardview'
],function($, _, Backbone){
   app.DiaryCardView = Backbone.View.extend({
   el: '#container',

  initialize: function(diary,y){
    console.log('initialize diarycardview');
    this.listenTo(this.collection, 'reset', this.addAll);
    _.bindAll(this, 'appendOne','appendView','checkEnd');
    notifElem = $('#notification');

    this.infiniScroll = new Backbone.InfiniScroll(this.collection, {success: this.appendView, onFetch: function(){ $('footer p').animate({ opacity: 0 }); }, onLoad: function(){ alert('Hello my Plug-in.'); }, onEnd: function(){ /*alert('reach the end of page');*/ }, pageSize: 6, scrollOffset: 100, includePage: true});
    this.infiniScroll.resetScroll();
    var start = this.collection.fetch({reset: true});

    $.scrollUp({
      scrollDistance:300,
      scrollSpeed: 50,
      animation: 'fade',
      animationInSpeed: 200,
      animationOutSpeed: 200,
      scrollText: 'Back to Top'
    });
  },
  onResize: function(){
    alert('resize');
    var targetColumns = Math.floor( $(document).width()/MIN_COL_WIDTH );
            if ( columns != targetColumns ) {
                this.layoutColumns();
            }
  },
  notify: function(message){
    notifElem.html(message);
    notifElem.css("transition","none");
    notifElem.css("display","block");
    notifElem.css("opacity","1");

    if(notifyTimeout){
      clearTimeout(notifyTimeout);
    }

    notifyTimeout = setTimeout(this.hideNotify, 1000);
  },
  hideNotify: function(){
    notifElem.css("transition","opacity 1.0s");
    notifElem.css("opacity","0")
  }, 
  layoutColumns: function(){

            columns = Math.floor( $(document).width()/MIN_COL_WIDTH );
            alert(columns);

            for ( var x = 0; x < columns; x++ ) {
                var col = $('<div class="column">');
                col.css( "width", Math.floor(100/columns)+"%" );
            }
  },
  addOne: function(photo){
    console.log('addOne\n');
    var photocardView = new app.PhotoCardView({model: photo});
    this.$el.append(photocardView.render().el);
  },
  addAll: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
    $('.iframe').colorbox({iframe:true, width:'90%', height:'90%', rel:'iframe'});
    $('.group1').colorbox({rel:'gruop1', speed:500, slideshow: false, slideshowSpeed: 4000, width:'80%', height:'80%'});
    var $container = $('#container').masonry();
    $container.masonry('bindResize');
    $('#container').css({opacity: 0});
    $container.imagesLoaded().done(function(instance){

      $('#container').animate({ opacity:1 });
      $('#container').masonry({
        itemSelector: ".card",
        columnWidth: 25,
        isFitWidth: true,
        isAnimated: true,
        animate: true
      });
    }).progress(function(instance, image){
      var result = image.isLoaded ? 'loaded' : 'broken';
    });
  },
  checkEnd: function(){
    this.notify('Reach the End of MasonryPage!');
  },
  appendView: function(collection, response){
     var $container = $('#container').masonry({itemSelect: '.card .demobox',
          columnWidth: 25,
          isAnimated: true,
          isFitWidth: true,
          animate: true
        }),
        appendlist;

        $container.masonry('on', 'layoutComplete', function(msnyInstance, laidOutItems){
       console.log('length of laidOutItems: ' + laidOutItems.length);
     });

     appendlist = _.map(response, function(listconfig){
       return new app.Photo(listconfig);
     });
     appendlist.forEach(this.appendOne, this);
     $('.iframe').colorbox({iframe:true, width:'90%',height:'90%', rel:'iframe'});
     $('.group1').colorbox({rel:'gruop1', speed:500, slideshow: false, slideshowSpeed: 4000, width:'80%', height:'80%'});
     $('footer p').animate({ opacity:1 });

     $container.append(elems).masonry('appended', elems);
     elems.splice(0,elems.length);

     if(response.length > 0){
       this.notify('Have Next Page!');
     } else {
       this.checkEnd();
     }
     console.log('response.length: ' + response.length + '\ncollection.length: ' + collection.length + '\nelems: ' + elems.length);
  },
  appendOne: function(photo){
    var photocardView = new app.PhotoCardView({model: photo});
    elems.push(photocardView.render().el);
  }
});

});
  

