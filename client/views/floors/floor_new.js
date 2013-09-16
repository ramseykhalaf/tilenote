Template.floor_new.events({
    'submit form': function(evt) {
        evt.preventDefault();

        var form = $(evt.target);
        var title = form.find('[name=title]').val();
        var description = form.find('[name=description]').val();
        
        var newFloorId = Meteor.call('createPost', title, description, function(error, newFloorId) {
            if (error)
                return alert(error.reason);

            Meteor.Router.to('showFloor', newFloorId);
        });
    }
});