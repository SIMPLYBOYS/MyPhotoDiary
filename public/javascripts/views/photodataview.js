var app = app || {},
    diary_id;

app.PhotoDataView = Backbone.View.extend({
   tagName: 'div',
   events: {
     'click .btn-primary':'updateDiary',
     'click .btn-danger':'checkDiary',
     //'click .btn-success':'deleteDiary'
   },
   initialize: function(){
     //diary_id = this.model.id;
     this.listenTo(this.model, 'change', this.render);
     this.listenTo(this.model, 'destroy', this.remove);
     $('#myModal').on('hidden.bs.modal', function(e){ 
       console.log('----------- Test model event -----\n\n'); 
       var delete_url = '/api/diaries/' + diary_id;
       $.ajax({
         url: delete_url,
         type: 'DELETE',
         success: function(data, textStatusm, jqXHR){
           console.log('------ ajax delete complete -----\n\n');
         },
         error: function(){
           console.log('------ ajax delete error -----\n\n');
         }
       });
     });
     $('.btn-success').click(function(){
       console.log('----------- click success event -----\n\n');
       $('#myModal').modal('hide');
     });
   },
   updateDiary: function(e){
     e.preventDefault();
     //alert('updateDiary '); a
     var textarea = $('#'+ this.model.id).val();
     this.model.save({message: textarea});
   },
   deleteDiary: function(e){
     //alert('deleteDiary ' + this.model.id);
     $('#myModal').modal('hide');
     this.model.destroy();
     this.remove();
   },
   checkDiary: function(e){ 
     diary_id = this.model.id;
     alert('check Diary:' + diary_id );
     $('#myModal').modal('show');
   },
   //className: 'col-xs-6 col-md-5 col-sm-5 col-lg-4',

   template: _.template('<div class="form-group"><label>Year:</label><input placeholder=<%= year %> disabled="disabled" class="form-control"></div><div class="form-group"><label>Month:</label><input placeholder=<%= month %> disabled="disabled" class="form-control"></div><div class="form-group"><label>Day:</label><input placeholder=<%= day %> disabled="disabled" class="form-control"></div><div class="form-group"><label> Note:</label><textarea rows="3" id=<%= _id  %> class="form-control"><%= message %></textarea></div><div class="caption"><button type="button" class="btn btn-primary aaron">Update</button>&nbsp<button type="button" class="btn btn-danger">Delete</button></div><br><br><br><br><br><br><br><br><br><br><br><br><br>'),

   render: function(){
     //var html = '<h3>' + this.model.get('author') + '</h3>';
     //console.log('--- PhotoDetailView---\n\n');
     var attributes = this.model.toJSON();
     this.$el.html(this.template(attributes));
     
     return this;
   }
});
