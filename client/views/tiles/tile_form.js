Template.tile_form.helpers({
    title: function() {
        return Tiles.findOne(Session.get('tileId'))['title'];
    },
    url: function() {
        return Tiles.findOne(Session.get('tileId'))['url'];
    }
});

Template.tile_form.events({
    'submit form': function(e) {
        e.preventDefault();

        console.log(this);

        var currentFloor = Session.get('floorId');
        var form = $(e.target);
        var newTile = {
            floorId: currentFloor,
            title: form.find('[name=title]').val(),
            url: form.find('[name=url]').val()
        };
        Tiles.insert(newTile);
        Meteor.Router.to('showFloor', currentFloor);
    }
});