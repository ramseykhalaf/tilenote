Template.floor_edit_form.events({
    'click .delete': function(event) {
        event.preventDefault();
        var floorId = event.target.dataset.floorid;
        Floors.remove(floorId, function(error) {
            if (error) {
                alert(error.reason);
            }
            var floorToShow = Floors.findOne({ownerId: Meteor.userId()});
            if (floorToShow) {
                Router.go('showFloor', floorToShow);
            } else {
                Router.go('listFloors');
            }
        });
    }
});