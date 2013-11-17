Template.floor_edit_form.events({
    'click .delete': function() {
        Floors.remove(Session.get('editingFloorId'), function(error) {
            console.log(this);
            if (error) {
                alert(error.reason);
            }
            Router.go('showFloor', Floors.findOne({ownerId: Meteor.userId()}));
        });
    }
})