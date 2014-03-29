var app = app || {},
    elems = [],
    notifElem,
    index= 0,
    notifyTimeout;

define([
  'underscore',
  'backbone', 
],function(_, Backbone){
  app.DiaryMasonryView = Backbone.View.extend({
  el: '#container',

  initialize: function(){

    _.bindAll(this, 'addAll', 'addOne', 'appendOne', 'appendView','checkEnd');
    notifElem = $('#notification');

    this.listenTo(this.collection, 'reset', this.addAll);
    this.infiniScroll = new Backbone.InfiniScroll(this.collection, {success: this.appendView, onFetch: function(){ $('footer p').animate({ opacity: 0 }); }, onLoad: function(){alert('Hello my Plug-in.');}, onEnd: function(){ /*alert('Reach The End Of Masonry Page!');*/}, pageSize: 6, scrollOffset: 100, includePage: true});
    this.infiniScroll.resetScroll();
    var p = this.collection.fetch({reset: true});

    $.scrollUp({
      scrollDistance:300,
      scrollSpeed: 50,
      animation: 'fade',
      animationInSpeed: 200,
      animationOutSpeed: 200,
      scrollText: 'Back to Top'
    });

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
    notifElem.css("opacity","0");
  },

  addOne: function(photo){
    index++;
    console.log('addOne with index:' + index + '\n');
    if(index > 2){
      var photomasonryView = new app.PhotoMasonryView({model: photo});
      this.$el.append(photomasonryView.render().el);
    } else if(index === 1) {
      var stampView = new app.StampView({model: photo});
      this.$el.append(stampView.render().el);
    } else if(index ===2) {
      var topicView = new app.TopicView({model: photo});
      this.$el.append(topicView.render().el);
    }
  },

  addAll: function(){

    this.$el.empty();
    this.collection.forEach(this.addOne, this);
    $('.group1').colorbox({rel:'group1', speed:500, width:'80%', height:'80%'});
    var $container = $('#container').masonry();
    $container.masonry('bindResize');
    $('#container').css({ opacity: 0 });
    $container.imagesLoaded().done(function(instance){
      $('#container').animate({ opacity:1 });
      $container.masonry({
          itemSelect: '.picbox .stamp .card .topic',
          columnWidth: 10,
          isAnimated: true,
          isFitWidth: true,
          animate: true
        });
    }).progress(function( instance, image){
      var result = image.isLoaded ? 'loaded' : 'broken';
    });
  },

  checkEnd: function(){
    this.notify('Reach the End of MasonryPage!');
  },

  appendView: function(collection, response){
   var $container = $('#container').masonry({itemSelect: '.picbox .demobox',
          columnWidth: 10,
          isAnimated: true,
          isFitWidth: true,
          animate: true
        });
    }).progress(function( instance, image){
      var result = image.isLoaded ? 'loaded' : 'broken';
    });
  },

  checkEnd: function(){
    this.notify('Reach the End of MasonryPage!');
  },

  appendView: function(collection, response){
   var $container = $('#container').masonry({itemSelect: '.picbox .demobox',
          columnWidth: 10,
          isAnimated: true,
          isFitWidth: true,
          animate: true
        }),
        appendlist;

   $container.masonry('on', 'layoutComplete', function(msnyInstance, laidOutItems){
    console.log('length of laidOutItems: ' + laidOutItems.length);
   })

   appendlist = _.map(response, function(listconfig){
     console.log(listconfig);
     return new app.Photo(listconfig);
   });

   appendlist.forEach(this.appendOne, this);
   $('.group1').colorbox({rel:'group1', speed:500, width:'80%', height:'80%'});
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
    var photomasonryView = new app.PhotoMasonryView({model: photo});
    elems.push(photomasonryView.render().el);
  }
});
});

