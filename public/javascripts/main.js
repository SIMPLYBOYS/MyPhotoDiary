require.config({
  paths: {
    jquery: './libs/jquery-2.1.0.min',
    underscore: './libs/underscore-min',
    backbone: './libs/backbone-min',
    bootstrap: './libs/bootstrap.min',
    masonry: './libs/masonry.pkgd',
    infiniscroll: './libs/infiniScroll',
    scrollup: './libs/jquery.scrollUp'
  },
  shim: {
    bootstrap: {
      deps: ["jquery"],
      exports: "$.fn.popover"
    }
  }
});

require(['app'], function(App){
  App.initialize();
});
