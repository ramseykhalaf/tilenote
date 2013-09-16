Template.floor_form.helpers({
    editingFloor: function() {
        return !!Session.get('editingFloorId');
    },
    title: function() {
        var editingFloor = Floors.findOne(Session.get('editingFloorId'));
        return editingFloor ? editingFloor.title : '';
    },
    description: function() {
        var editingFloor = Floors.findOne(Session.get('editingFloorId'));
        return editingFloor ? editingFloor.description : '';
    }

});

Template.floor_form.events({
    'submit form': function(evt) {
        evt.preventDefault();

        var form = $(evt.target);
        var title = form.find('[name=title]').val();
        var description = form.find('[name=description]').val();
        var editingFloorId = Session.get('editingFloorId');

        console.log(editingFloorId);

        if (editingFloorId) { //update
            console.log('updatefloor');
            Floors.update(editingFloorId, {$set: {title: title, description: description}}, function(error) {
                if (error) {
                    return alert(error.reason);
                }
                Meteor.Router.to('showFloor', editingFloorId);
            });
        } else { //new floor
            console.log('new floor');
            Meteor.call('createPost', title, description, function(error, newFloorId) {
                if (error) {
                    return alert(error.reason);
                }
                Meteor.Router.to('showFloor', newFloorId);
            });
        }
    },
    'click .delete': function(evt) {
        Floors.remove(Session.get('editingFloorId'), function(error) {
            if (error) {
                alert(error.reason);
            }
            Meteor.Router.to('showFloor', Floors.findOne({ownerId: Meteor.userId()}));
        });
    }
});