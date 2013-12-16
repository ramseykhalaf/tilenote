Template.tile_edit_form.events({
    'click .removetile': function(evt) {
        evt.preventDefault();

        Tiles.remove(Session.get('editingTileId'), function(error) {
            if (error) {
                console.log(error);
            }
        });

        var currentFloor = Floors.findOne(Session.get('floorId'));
        Router.go('showFloor', currentFloor);        
    }
});