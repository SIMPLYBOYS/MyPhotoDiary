var app = app || {},
   content = '',
   columns = '',
  MIN_COL_WIDTH = 300;

app.DiaryCardView = Backbone.View.extend({
  el: '.row.demo',

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
  onResize: function(){
    alert('resize');
    var targetColumns = Math.floor( $(document).width()/MIN_COL_WIDTH );
            if ( columns != targetColumns ) {
                this.layoutColumns();   
            }
  },
  layoutColumns: function(){
     //content.detach();
            //content.empty();
            
            columns = Math.floor( $(document).width()/MIN_COL_WIDTH );
            alert(columns);
            
            //var columns_dom = [];
            for ( var x = 0; x < columns; x++ ) {
                var col = $('<div class="column">');
                col.css( "width", Math.floor(100/columns)+"%" );
                //columns_dom.push( col );   
                //content.append(col);
            } 
            //$("body").prepend (content);
  },
  addOne: function(photo){
    console.log('addOne\n');
    var photocardView = new app.PhotoCardView({model: photo});
    this.$el.append(photocardView.render().el);
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
    console.log(content);
    //$("body").prepend(content);
  }
});
