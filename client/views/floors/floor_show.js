Template.floor_show.helpers({
    floorSelected: function() {
        return !!Session.get('floorId');
    }
});