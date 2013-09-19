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
    },
    isPrivate: function() {
        var editingFloor = Floors.findOne(Session.get('editingFloorId'));
        return editingFloor ? editingFloor.isPrivate : '';
    }

});

Template.floor_form.events({
    'submit form': function(evt) {
        evt.preventDefault();

        var form = $(evt.target);
        var title = form.find('[name=title]').val();
        var description = form.find('[name=description]').val();
        var isPrivate = !!form.find('[name=isPrivate]').attr('checked');
        var editingFloorId = Session.get('editingFloorId');

        if (editingFloorId) { //update
            Floors.update(editingFloorId, {$set: {title: title, description: description, isPrivate: isPrivate}}, function(error) {
                if (error) {
                    return alert(error.reason);
                }
                Meteor.Router.to('showFloor', editingFloorId);
            });
        } else { //new floor
            Meteor.call('createPost', title, description, isPrivate, function(error, newFloorId) {
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