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
    isPublic: function() {
        var editingFloor = Floors.findOne(Session.get('editingFloorId'));
        return editingFloor ? editingFloor.isPublic : false;
    }

});

Template.floor_form.events({
    'submit form': function(evt) {
        evt.preventDefault();

        var form = $(evt.target);
        var title = form.find('[name=title]').val();
        var description = form.find('[name=description]').val();
        var isPublic = !!form.find('[name=isPublic]').attr('checked');
        var editingFloorId = Session.get('editingFloorId');

        if (editingFloorId) { //update
            Floors.update(editingFloorId, {$set: {title: title, description: description, isPublic: isPublic}}, function(error) {
                if (error) {
                    return alert(error.reason);
                }
                Router.go('showFloor', {_id: editingFloorId});
            });
        } else { //new floor
            Meteor.call('createFloor', title, description, isPublic, function(error, newFloorId) {
                if (error) {
                    return alert(error.reason);
                }
                Router.go('showFloor', {_id: newFloorId});
            });
        }
    },
    'click .delete': function(evt) {
        Floors.remove(Session.get('editingFloorId'), function(error) {
            if (error) {
                alert(error.reason);
            }
            Router.go('showFloor', Floors.findOne({ownerId: Meteor.userId()}));
        });
    }
});