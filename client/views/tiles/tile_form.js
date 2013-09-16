
Template.tile_form.helpers({
    editingTile: function() {
        return !!Session.get('editingTileId');
    },
    title: function() {
        var editingTile = Tiles.findOne(Session.get('editingTileId'));
        return editingTile ? editingTile.title : '';
    },
    url: function() {
        var editingTile = Tiles.findOne(Session.get('editingTileId'));
        return editingTile ? editingTile.url : '';
    },
});

Template.tile_form.events({
    'submit form': function(evt) {
        evt.preventDefault();

        var currentFloor = Session.get('floorId');
        var editingTileId = Session.get('editingTileId');
        var form = $(evt.target);
        
        var newTile = {
            floorId: currentFloor,
            title: form.find('[name=title]').val(),
            url: form.find('[name=url]').val()
        };
        
        if (editingTileId) { //update rather than insert
            Tiles.update(editingTileId, { $set: { title: newTile.title, url: newTile.url } }, function(error) {
                if (error) {
                    console.log(error);
                } else {
                    Meteor.Router.to('showFloor', currentFloor);
                }
            });
        } else { //new tile - insert
            Tiles.insert(newTile, function(error, id) {
                if (error) {
                    console.log(error);
                } else {
                    Meteor.Router.to('showFloor', currentFloor);
                }
            });
        }
    },
    'click .removetile': function(evt) {
        evt.preventDefault();

        Tiles.remove(Session.get('editingTileId'), function(error) {
            if (error) {
                console.log(error);
            }
        });

        Meteor.Router.to('showFloor', Session.get('currentFloor'));        
    }
});