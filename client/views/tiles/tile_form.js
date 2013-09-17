
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
        var form = $(evt.target);

        var currentFloor = Session.get('floorId');
        var editingTileId = Session.get('editingTileId');
        var title = form.find('[name=title]').val();
        var url = form.find('[name=url]').val();
        var thumbnailLink = generateThumbnailLink(url);
        
        if (editingTileId) { //update rather than insert
            Tiles.update(editingTileId,
                         { $set: { title: title, url: url, thumbnailLink: thumbnailLink} },
                         function(error) {
                            if (error) {
                                console.log(error);
                            } else {
                                Meteor.Router.to('showFloor', currentFloor);
                            }
                         });
        } else { //new tile - insert
            Meteor.call('createTile', currentFloor, title, url, function(error) {
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