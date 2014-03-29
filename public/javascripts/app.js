var app = app || {}
,  SERVER_IP = '54.200.206.84';

/*$(function(){

  //alert('Backbone Test Begin !');
  //new app.DiaryView();
  PhotoDiaryApp.start();
  /*$('#container').infinitescroll({
      itemSelector: '.picbox',
      dataType: 'html',
      loading: {
        msgText: 'Loading',
        finishedMsg: 'Nothing left...',
        selector: '.loading'
      }
    }, function(arrayOfNewElems){
     alert('infite scroll');
     console.log('-------- finish loading ------\n');
  }); 
 
});*/

define(['jquery',
	'underscore',
	'backbone',
	'router',
        'bootstrap'], function($, _, Backbone, Router){
	var initialize = function(){
	   	console.log('----- amd check ----\n');
    		Router.initialize();
        };

	return {initialize: initialize
        };
});
